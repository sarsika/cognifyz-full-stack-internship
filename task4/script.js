const app = document.getElementById('app');
let tasks = [];

function showHome() {
  app.innerHTML = '<h2>Welcome</h2><p>This is the home page. Use the menu above to go to other pages.</p>';
}

function showSignup() {
  app.innerHTML =
    '<h2>Sign Up</h2>' +
    '<input type="text" id="username" placeholder="Username">' +
    '<p class="error" id="usernameError"></p>' +
    '<input type="text" id="email" placeholder="Email">' +
    '<p class="error" id="emailError"></p>' +
    '<input type="password" id="password" placeholder="Password">' +
    '<div id="strengthBar"></div>' +
    '<p id="strengthText"></p>' +
    '<input type="password" id="confirm" placeholder="Confirm Password">' +
    '<p class="error" id="confirmError"></p>' +
    '<button id="signupBtn">Sign Up</button>' +
    '<p id="result"></p>';

  document.getElementById('password').addEventListener('input', checkStrength);
  document.getElementById('signupBtn').addEventListener('click', validateSignup);
}

function checkStrength() {
  const password = document.getElementById('password').value;
  const bar = document.getElementById('strengthBar');
  const text = document.getElementById('strengthText');
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (password.length === 0) {
    bar.style.width = '0';
    text.innerText = '';
  } else if (score <= 1) {
    bar.style.width = '25%';
    bar.style.backgroundColor = 'red';
    text.innerText = 'Weak';
  } else if (score === 2) {
    bar.style.width = '50%';
    bar.style.backgroundColor = 'orange';
    text.innerText = 'Medium';
  } else if (score === 3) {
    bar.style.width = '75%';
    bar.style.backgroundColor = 'gold';
    text.innerText = 'Good';
  } else {
    bar.style.width = '100%';
    bar.style.backgroundColor = 'green';
    text.innerText = 'Strong';
  }
}

function validateSignup() {
  const username = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value;
  const confirm = document.getElementById('confirm').value;
  let valid = true;

  document.getElementById('usernameError').innerText = '';
  document.getElementById('emailError').innerText = '';
  document.getElementById('confirmError').innerText = '';
  document.getElementById('result').innerText = '';

  if (username.length < 4) {
    document.getElementById('usernameError').innerText = 'Username must be at least 4 characters';
    valid = false;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    document.getElementById('emailError').innerText = 'Enter a valid email';
    valid = false;
  }

  const strongPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9]).{8,}$/;
  if (!strongPattern.test(password)) {
    document.getElementById('strengthText').innerText = 'Need 8+ chars, 1 capital, 1 number, 1 symbol';
    valid = false;
  }

  if (password !== confirm) {
    document.getElementById('confirmError').innerText = 'Passwords do not match';
    valid = false;
  }

  if (valid) {
    const result = document.getElementById('result');
    result.className = 'success';
    result.innerText = 'Sign up successful!';
  }
}

function showTasks() {
  app.innerHTML =
    '<h2>My Tasks</h2>' +
    '<input type="text" id="taskInput" placeholder="Enter a task">' +
    '<button id="addBtn">Add Task</button>' +
    '<ul id="taskList"></ul>';

  document.getElementById('addBtn').addEventListener('click', addTask);
  renderTasks();
}

function addTask() {
  const input = document.getElementById('taskInput');
  const value = input.value.trim();

  if (value === '') {
    return;
  }

  tasks.push(value);
  input.value = '';
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById('taskList');
  list.innerHTML = '';

  tasks.forEach(function (task, index) {
    const li = document.createElement('li');
    li.innerText = task;

    const btn = document.createElement('button');
    btn.innerText = 'Delete';
    btn.addEventListener('click', function () {
      tasks.splice(index, 1);
      renderTasks();
    });

    li.appendChild(btn);
    list.appendChild(li);
  });
}

function router() {
  const page = window.location.hash;

  if (page === '#signup') {
    showSignup();
  } else if (page === '#tasks') {
    showTasks();
  } else {
    showHome();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);
