const form = document.getElementById('reminderForm');
const list = document.getElementById('reminderList');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form).entries());
  
  const response = await fetch('/api/reminders/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  
  const result = await response.json();
  alert(result.message);
  form.reset();
  fetchReminders();
});

async function fetchReminders() {
  const res = await fetch('/api/reminders/all');
  const reminders = await res.json();
  list.innerHTML = '';
  reminders.forEach(r => {
    const li = document.createElement('li');
    li.textContent = `${r.name} needs to take ${r.medicine} (${r.dosage}) on ${new Date(r.date).toDateString()} at ${r.time}`;
    list.appendChild(li);
  });
}

fetchReminders();
