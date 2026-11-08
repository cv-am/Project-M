document.addEventListener('DOMContentLoaded', () => {
  const searchForm = document.getElementById('tripSearch');
  const destinationInput = document.getElementById('destinationInput');
  const tripType = document.getElementById('tripType');
  const searchMessage = document.getElementById('searchMessage');
  const destinationItems = [...document.querySelectorAll('.destination-item')];
  const packageItems = [...document.querySelectorAll('.package-item')];

  searchForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const term = destinationInput.value.trim().toLowerCase();
    const type = tripType.value;
    let matches = 0;

    destinationItems.forEach((item) => {
      const nameMatches = !term || item.dataset.name.toLowerCase().includes(term);
      const typeMatches = type === 'all' || item.dataset.type.split(' ').includes(type);
      const show = nameMatches && typeMatches;
      item.classList.toggle('d-none', !show);
      if (show) matches++;
    });
    packageItems.forEach((item) => {
      const nameMatches = !term || item.dataset.name.toLowerCase().includes(term);
      const typeMatches = type === 'all' || item.dataset.type.split(' ').includes(type);
      item.classList.toggle('d-none', !(nameMatches && typeMatches));
    });

    searchMessage.textContent = matches
      ? `${matches} destination${matches === 1 ? '' : 's'} found. Matching trip ideas are shown below.`
      : 'No exact match found. Try another destination or choose “Any experience”.';
    document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' });
  });

  document.querySelector('a[href="#home"]').addEventListener('click', () => {
    destinationItems.forEach((item) => item.classList.remove('d-none'));
    packageItems.forEach((item) => item.classList.remove('d-none'));
    searchForm.reset();
    searchMessage.textContent = '';
  });

  const packageInfo = {
    'Himalayan Escape': 'A sample 5-day mountain holiday idea featuring scenic viewpoints, relaxed local exploration and time to enjoy the Himalayan landscape. The displayed price is illustrative only.',
    'Coastal Retreat': 'A sample 4-day coastal break with beach time, local market visits and relaxed evenings. The displayed price is illustrative only.',
    'Royal Rajasthan': 'A sample 6-day heritage-themed journey through Jaipur and Udaipur, with historic architecture, local crafts and regional food experiences. The displayed price is illustrative only.'
  };
  const modalElement = document.getElementById('packageModal');
  const packageModal = new bootstrap.Modal(modalElement);
  document.querySelectorAll('.book-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const name = button.dataset.package;
      document.getElementById('packageModalTitle').textContent = name;
      document.getElementById('packageModalBody').textContent = packageInfo[name] || 'Contact us for more information about this sample trip.';
      packageModal.show();
    });
  });

  const contactForm = document.getElementById('contactForm');
  const feedback = document.getElementById('formFeedback');
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const name = document.getElementById('fullName').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!name || !email || !message) {
      feedback.textContent = 'Please complete your name, email and message.';
      feedback.style.color = '#a34436';
      return;
    }
    if (!validEmail) {
      feedback.textContent = 'Please enter a valid email address.';
      feedback.style.color = '#a34436';
      return;
    }
    feedback.textContent = 'Thanks! Your details passed the demo form validation.';
    feedback.style.color = '#315d49';
    contactForm.reset();
  });

  document.getElementById('year').textContent = new Date().getFullYear();

  document.querySelectorAll('#mainNav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const nav = document.getElementById('mainNav');
      if (nav.classList.contains('show')) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });
});
