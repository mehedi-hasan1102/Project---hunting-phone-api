const loadPhone = async (searchText = 'iphone') => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
        const data = await res.json();
        displayPhone(data.data);
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.innerHTML = ''; // Clear previous results

    phones.forEach(phone => {
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
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <div class="badge badge-outline">Fashion</div>
                    <div class="badge badge-outline">Products</div>
                </div>
                <button class="btn btn-primary">Buy Now</button>
            </div>
        `;

        // Append the phone card to the phone container
        phoneContainer.appendChild(phoneCard);
    });
}

// Function to handle search input
const handleSearch = () => {
    const searchField = document.getElementById('search-field'); // Reference to search input field
    const searchText = searchField.value.trim();

    if (searchText) {
        loadPhone(searchText); // Call loadPhone function with the search text
    } else {
        console.log('Please enter a search term.');
        phoneContainer.innerHTML = '<p class="text-center text-red-500">Please enter a search term to find phones.</p>';
    }
}

// Call the function to load default phones
loadPhone();
