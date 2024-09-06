function showLogin() 
{
  document.getElementById("login-form").style.display = "block";
  document.getElementById("register-form").style.display = "none";
}
  
function showRegister()
{
  document.getElementById("login-form").style.display = "none";
  document.getElementById("register-form").style.display = "block";
  // setCookie("token","",1);
}

function setCookie(name, value, days)
{
  let expires = "";
  if (days)
  {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name)
{
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
  }
  return null;
}

async function register()
{
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if(username == "")
  {
    alert("Minimum user name should be 1 simvol");
    return;
  }

  else if(password == "")
  {
    alert("Minimum password should be 1 simvol");
    return;
  }

  const userData =
  {
    username: username,
    password: password
  };

  try
  {
    const response = await fetch('https://localhost:7093/api/Auth/register',
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok)
    {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    else
    {
      document.getElementById('username').value = "";
      document.getElementById('password').value = "";
      document.getElementById('error').innerText = "";
      alert("You are Registered");
    }
    
  } 
  catch (error)
  {
    document.getElementById('error').innerText = 'Error: ' + error.message;
  }
    
}

async function login()
{
  const username = document.getElementById('lUsername').value;
  const password = document.getElementById('lPassword').value;

  if(username == "")
  {
    alert("Minimum user name should be 1 simvol");
    return;
  }

  else if(password == "")
  {
    alert("Minimum password should be 1 simvol");
    return;
  }

  const userData =
  {
    username: username,
    password: password
  };

  try
  {
    const response = await fetch('https://localhost:7093/api/Auth/login',
    {
      method: 'POST',
      headers: 
      {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userData)
    });
    
    if (!response.ok)
    {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    else
    {
      const result = await response.text();
      setCookie('token', result, 1); 
      document.getElementById('lUsername').value = "";
      document.getElementById('lPassword').value = "";
      document.getElementById('error').innerText = "";
      alert("You are signed");
      
    }
    
  } 
  catch (error)
  {
    document.getElementById('error').innerText = 'Error: ' + error.message;
  }
}
  
async function getCities()
{
  const token = getCookie("token");
  try
  {
    const response = await fetch('https://localhost:7093/api/Cities',
    {
      method: 'GET',
      headers: {
        'Authorization': `bearer ${token}`,
        'Content-Type': 'application/json'
        }
    });
  
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log('Data:', data);
    let a = ""
    data.forEach((item) =>
    {
      a += `<section style="margin-top:30px;display:flex;border:1px solid black;padding:10px;border-radius:10px;width:50%">
      <p style="margin-top:10px;margin-right:30px;font-size:1.2em">${item.name}</p>
      <p style="margin-top:10px;font-size:1.2em">${item.description}</p>
      </section>`         
    });

    const div = document.getElementById("div");
    div.innerHTML = a;
    document.getElementById('error').innerText = "";
  } 
  catch (error)
  {
    console.error('Error fetching data:', error);
    const errorElement = document.getElementById('error');
    errorElement.innerText = 'Error: ' + error.message;
  }
}

  