let allPhones = []; // Variable to store all phones fetched

const loadPhone = async (searchText = 'iphone') => {
    try {
        toggleLoadingSpinner(true); // Show spinner when fetching data

        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        allPhones = data.data; // Store all fetched phones

        // Simulate a delay for 3 seconds before displaying results
        setTimeout(() => {
            displayPhone(allPhones); // Initially display phones
            toggleLoadingSpinner(false); // Hide spinner after data is loaded
        }, 3000);

    } catch (error) {
        console.error('Error occurred:', error);
        toggleLoadingSpinner(false); // Hide spinner if there is an error
    }
};

const displayPhone = (phones, limit = 12) => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ''; // Clear previous results

    const showAllContainer = document.getElementById('show-all-container');

    // Show only a subset of phones if there are more than the limit
    const phonesToDisplay = phones.slice(0, limit);

    // Check if there are more than the limit and show/hide the "Show All" button
    if (phones.length > limit) {
        showAllContainer.classList.remove('hidden'); // Show the button
    } else {
        showAllContainer.classList.add('hidden'); // Hide the button
    }

    phonesToDisplay.forEach(phone => {
        // Create a new div element for each phone
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card w-96 bg-gray-100 shadow-xl';

        // Set the inner HTML for the phone card
        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}" alt="${phone.phone_name}" />
            </figure>
            <div class="card-body">
                <h2 class="card-title">
                    ${phone.phone_name}
                    <div class="badge badge-secondary">NEW</div>
                </h2>
                <p>New mobile is simple of your smartness!</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">Fashion</div>
                    <div class="badge badge-outline">Products</div>
                </div>
                <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary">Show Details</button>
                <button class="btn btn-primary">Buy Now</button>
            </div>
        `;

        // Append the phone card to the phone container
        phoneContainer.appendChild(phoneCard);
    });
};

// Function to handle showing details in a modal
const handleShowDetail = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
        const data = await res.json();
        const phoneDetail = data.data;
        showPhoneModal(phoneDetail); // Call function to display modal with phone details
    } catch (error) {
        console.error('Error fetching phone details:', error);
    }
};

// Function to display the modal with phone details
const showPhoneModal = (phoneDetail) => {
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');

    modalTitle.textContent = phoneDetail.name; // Set modal title to phone name
    modalBody.innerHTML = `
        <p><strong>Brand:</strong> ${phoneDetail.brand}</p>
        <p><strong>Release Date:</strong> ${phoneDetail.releaseDate ? phoneDetail.releaseDate : 'No release date found'}</p>
        <p><strong>Main Features:</strong></p>
        <ul>
            ${phoneDetail.mainFeatures ? Object.entries(phoneDetail.mainFeatures).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('') : 'No main features available'}
        </ul>
        <p><strong>Others:</strong></p>
        <ul>
            ${phoneDetail.others ? Object.entries(phoneDetail.others).map(([key, value]) => `<li><strong>${key}:</strong> ${value}</li>`).join('') : 'No additional information available'}
        </ul>
    `;

    // Show the modal
    const modalElement = document.getElementById('phone-modal');
    modalElement.classList.remove('hidden');
};

// Function to handle search input
const handleSearch = () => {
    const searchField = document.getElementById('search-field'); // Reference to search input field
    const searchText = searchField.value.trim();

    if (searchText) {
        loadPhone(searchText); // Call loadPhone function with the search text
    } else {
        console.log('Please enter a search term.');
        const phoneContainer = document.getElementById('phone-container');
        phoneContainer.innerHTML = '<p class="text-center text-red-500">Please enter a search term to find phones.</p>';
    }
};

// Function to handle "Show All" button click
const handleShowAll = () => {
    displayPhone(allPhones, allPhones.length); // Display all phones
};

// Function to toggle loading spinner visibility
const toggleLoadingSpinner = (show) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (show) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
};

// Function to close the modal
const closeModal = () => {
    const modalElement = document.getElementById('phone-modal');
    modalElement.classList.add('hidden');
};

// Call the function to load default phones
loadPhone();
