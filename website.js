const webURL = 'https://healthyeats-4iai.onrender.com';
document.addEventListener('DOMContentLoaded', function () {
  const loader = document.querySelector('.loader');
  // Event listener for login form
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the default action of submitting the form and reloading the page
      const emailInput = document.getElementById('email');
      const passwordInput = document.getElementById('password');

      // Check if elements are found
      if (emailInput && passwordInput) {
        const email = emailInput.value; // Selects HTML element with ID username and retrieves the value
        const password = passwordInput.value; // Retrieves value of password from HTML
        console.log(email, password);
        fetch(`${webURL}/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password }) // Converts the user and pass to a string so the API can process the information
        })
          .then(response => response.json()) // Converts the response from JSON (JavaScript Object Notation) format to JavaScript
          .then(data => {
            console.log(data);
            if (data.success) {
              // Redirect to profile page
              window.location.href = 'profile.html';
              console.log('Login was successful!');
            } else {
              alert('Login failed: ' + data.message);
            }
          })
          .catch(error => console.error);
      } else {
        console.error('Login form elements not found.');
      }
    });
  }

  const enableLoader = () => {
    if (loader) {
      loader.style.display = 'flex';
    }
  };

  const disableLoader = () => {
    console.log(loader);
    loader.style.display = 'none';
  };

  // Event listener for meal search form
  //
  const mealForm = document.getElementById('meal-form');

  if (mealForm) {
    mealForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the default action of submitting the form and reloading the page
      enableLoader();
      const mealInput = document.getElementById('Input');

      if (mealInput) {
        const meal = mealInput.value;
        fetch(`${webURL}/meal/mealsearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ meal: meal })
        })
          .then(response => response.json())
          .then(result => {
            console.log(result);
            const data = result?.filter(o => !!o);

            // Clear previous results
            const mealResults = document.querySelector('.search-results');
            mealResults.innerHTML = '';

            if (data && data.length > 0) {
              const meal = data[0]; // First result is the searched meal
              const alternative = data[1]; // Second result is the alternative

              // Display the searched meal
              const mealElement = document.createElement('div');
              mealElement.classList.add('meal-details');
              mealElement.innerHTML = `
                                <h3 id="meal-name">${meal.name}</h3>
                            
                                <div id="meal-breakdown">
                                    <h4>Nutritional Breakdown:</h4>
                                    <ul>
                                        <li>Calories: <span id="meal-calories">${
                                          meal.calories || '0'
                                        }</span> kcal</li>
                                        <li>Carbohydrates: <span id="meal-carbohydrates">${
                                          meal.carbohydrates || '0'
                                        }</span> g</li>
                                        <li>Fat: <span id="meal-fat">${
                                          meal.fat || '0'
                                        }</span> g</li>
                                        <li>Protein: <span id="meal-protein">${
                                          meal.protein || '0'
                                        }</span> g</li>
                                        <li>Sodium: <span id="meal-sodium">${
                                          meal.sodium || '0'
                                        }</span> mg</li>
                                        <li>Iron: <span id="meal-iron">${
                                          meal.iron || '0'
                                        }</span> mg</li>
                                        <li>Cholesterol: <span id="meal-cholesterol">${
                                          meal.cholesterol || '0'
                                        }</span> mg</li>
                                    </ul>
                                </div>
                            `;
              mealResults.appendChild(mealElement);

              // Display the alternative meal
              const alternativeElement = document.createElement('div');
              alternativeElement.classList.add('meal-details');

              alternativeElement.innerHTML = `
                                <h3 id="alternative-meal-name">${
                                  alternative.name
                                }</h3>
            
                                <div id="alternative-meal-breakdown">
                                    <h4>Nutritional Breakdown:</h4>
                                    <ul>
                                        <li>Calories: <span id="alternative-meal-calories">${
                                          alternative.calories || '0'
                                        }</span> kcal</li>
                                        <li>Carbohydrates: <span id="alternative-meal-carbohydrates">${
                                          alternative.carbohydrates || '0'
                                        }</span> g</li>
                                        <li>Fat: <span id="alternative-meal-fat">${
                                          alternative.fat || '0'
                                        }</span> g</li>
                                        <li>Protein: <span id="alternative-meal-protein">${
                                          alternative.protein || '0'
                                        }</span> g</li>
                                        <li>Sodium: <span id="alternative-meal-sodium">${
                                          alternative.sodium || '0'
                                        }</span> mg</li>
                                        <li>Iron: <span id="alternative-meal-iron">${
                                          alternative.iron || '0'
                                        }</span> mg</li>
                                        <li>Cholesterol: <span id="alternative-meal-cholesterol">${
                                          alternative.cholesterol || '0'
                                        }</span> mg</li>
                                    </ul>
                                </div>
                            `;
              mealResults.appendChild(alternativeElement);
            } else {
              alert('Meal not found');
            }
          })
          .catch(error => console.error('Error:', error))
          .finally(() => disableLoader());
      } else {
        console.error('Meal input element not found.');
        disableLoader();
        alert('Please fill input field');
      }
    });
  }

  // Event listener for restaurant search form
  const restaurantForm = document.getElementById('restaurant-form');
  if (restaurantForm) {
    restaurantForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the default action of submitting the form and reloading the page
      enableLoader();

      const mealInput = document.getElementById('restaurant-input');
      const queryString = window.location.search;
      const urlParams = new URLSearchParams(queryString);
      const province = urlParams.get('province');
      console.log(province, mealInput);
      if (mealInput && province) {
        const meal = mealInput.value;
        const data = {
          meal,
          province
        };
        fetch(`${webURL}/rest/restaurantsearch`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        })
          .then(response => response.json())
          .then(result => {
            console.log(result);
            // Clear previous results
            const search = document.getElementById(
              'restaurant-results-container'
            );

            const data = result?.filter(o => !!o);

            // Clear previous results
            search.innerHTML = '';

            if (data && data.length > 0) {
              // Display the restaurant details
              const restaurantElement = document.createElement('ul');
              data.forEach(item => {
                if (
                  item.location.toLowerCase().includes(province.toLowerCase())
                ) {
                  const card = ` 
                  <a href=${item.link}>
                    <div class="restaurant-card" id="mealInput">
                      <h2 class="restaurant-name">${item.name}</h2>
                      <p class="restaurant-location">${item.location}</p>
                      <a class="restaurant-link" href="${item.link}">Visit</a>
                      <p class="restaurant-rating">${item.rating}</p>
                    </div> 
                  </a>`;
                  const listItem = document.createElement('li');
                  listItem.innerHTML = card;
                  restaurantElement.appendChild(listItem);
                }
              });

              search.appendChild(restaurantElement);
            } else {
              alert('No restaurants found');
            }
          })
          .catch(error => console.error('Error:', error))
          .finally(() => disableLoader());
      } else {
        console.error('Restaurant form elements not found.');
        disableLoader();
        alert('Please fill input field');
      }
    });
  }

  // Event listener for question submission form
  const questionForm = document.getElementById('question-form');
  if (questionForm) {
    questionForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the default action of submitting the form and reloading the page
      const questionInput = document.getElementById('question-input');

      if (questionInput) {
        const question = questionInput.value;

        fetch(`${webURL}:3000/questions`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ question })
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              alert('Question submitted successfully');
              questionForm.reset(); // Clear the form
            } else {
              alert('Failed to submit question: ' + data.message);
            }
          })
          .catch(error => console.error('Error:', error));
      } else {
        console.error('Question input element not found.');
      }
    });
  }

  // Event listener for profile form
  const profileForm = document.getElementById('profile-form');
  if (profileForm) {
    profileForm.addEventListener('submit', function (event) {
      event.preventDefault(); // Prevents the default action of submitting the form and reloading the page
      const firstNameInput = document.getElementById('first-name');
      const lastNameInput = document.getElementById('last-name');
      const ageInput = document.getElementById('age');
      const genderInput = document.getElementById('gender');
      const healthGoalInput = document.getElementById('health-goal');
      if (
        firstNameInput &&
        lastNameInput &&
        ageInput &&
        genderInput &&
        healthGoalInput
      ) {
        const firstname = firstNameInput.value;
        const lastname = lastNameInput.value;
        const age = ageInput.value;
        const gender = genderInput.value;
        const healthGoal = healthGoalInput.value;
        const body = JSON.stringify({
          firstname,
          lastname,
          age,
          gender,
          healthGoal,
          email: 'toluwaniakinwande@gmail.com'
        });
        console.log(body);
        fetch(`${webURL}/profile`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body
        })
          .then(response => response.json())
          .then(data => {
            console.log(data);
            if (data.success) {
              alert('Profile updated successfully');
              window.location.href = 'index.html'; // Redirect to home or another page after successful update
            } else {
              alert('Failed to update profile: ' + data.message);
            }
          })
          .catch(error => console.error('Error:', error));
      } else {
        console.error('Profile form elements not found.');
      }
    });
  }
});

//Meal image that we are no longer using
// <img id="alternative-meal-image" src="${
//   alternative.image || ""
// }" alt="${alternative.name}">

// <img id="meal-image" src="${
//   meal.image || ""
// }" alt="${meal.name}">
