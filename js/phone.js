const loadPhone = async () => {
    try {
        const res = await fetch('https://openapi.programming-hero.com/api/phones?search=iphone');
        const data = await res.json();
        console.log(data.data);
        displayPhone(data.data); // Pass the data to the displayPhone function
    } catch (error) {
        console.error('Error occurred:', error);
    }
}

const displayPhone = phones => {
    const phoneContainer = document.getElementById('phone-container'); // Corrected 'Phone-container' to 'phone-container'

    phones.forEach(phone => {
        console.log(phone);

        // Create a new div element for each phone
        const phoneCard = document.createElement('div');
        phoneCard.classList = 'card w-96 bg-gray-100 shadow-xl'; // Corrected class name and syntax

        // Set the inner HTML for the phone card
        phoneCard.innerHTML = `
            <figure>
                <img src="${phone.image}"alt="${phone.phone_name}" />
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

// Call the function to load phones
loadPhone();
