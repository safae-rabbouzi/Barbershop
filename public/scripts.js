document.addEventListener('DOMContentLoaded', () => {
    // Fonction pour charger les rendez-vous existants
    async function loadAppointments() {
        try {
            // Requête à l'API pour récupérer les rendez-vous
            const response = await fetch('https://barbershop-production-cbca.up.railway.app/api/bookings');
            const appointments = await response.json();

            // Vérifier si la réponse contient des rendez-vous
            if (Array.isArray(appointments) && appointments.length > 0) {
                const appointmentList = document.getElementById('appointmentList');
                appointmentList.innerHTML = ''; // Vider la liste avant de la remplir

                // Ajouter chaque rendez-vous à la liste
                appointments.forEach((appointment) => {
                    const listItem = document.createElement('li');
                    listItem.textContent = `${appointment.name} - ${appointment.date} at ${appointment.time}`;
                    appointmentList.appendChild(listItem);
                });
            } else {
                // Si aucun rendez-vous, afficher un message
                document.getElementById('appointmentList').innerHTML = '<li>No appointments yet.</li>';
            }
        } catch (error) {
            console.error('Error loading appointments:', error);
            document.getElementById('appointmentList').innerHTML = '<li>Error loading appointments.</li>';
        }
    }

    // Handle appointments at reload
    loadAppointments();

    // Handle booking form submission
    const bookingForm = document.getElementById('bookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            const response = await fetch('https://barbershop-production-cbca.up.railway.app/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, date, time }),
            });

            const result = await response.json();

            if (response.ok) {
                const appointmentList = document.getElementById('appointmentList');
                const listItem = document.createElement('li');
                listItem.textContent = `${name} - ${date} at ${time}`;
                appointmentList.appendChild(listItem);
        
                alert('Booking successful!');
                document.getElementById('bookingForm').reset();
            } else {
                alert('Error: ' + result.message);
            }
        });
    }

    // Handle contact form submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (event) {
            event.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const response = await fetch('https://barbershop-production-cbca.up.railway.app/api/messages', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email, message }),
            });

            const result = await response.json();

            if (response.ok) {
                alert('Message sent successfully!');
                contactForm.reset();
            } else {
                alert('Error: ' + result.message);
            }
        });
    }
});
