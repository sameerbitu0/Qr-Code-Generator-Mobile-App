import API_CONFIG from './Api_Config';
import URL_CONFIG from './Url_Config';

// LogOut Api

export async function logOut(userToken) {
  const originalBearerToken = `Bearer ${userToken}`;
  const bearerToken = originalBearerToken.replace(/"/g, '');
  try {
    const response = await fetch(URL_CONFIG.url + API_CONFIG.logout_api, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
        accept: 'application/json',
        Authorization: bearerToken,
      },
    });
    if (!response.ok) {
      throw new Error('API request failed');
    }
    const data = await response.json();
    const apiResponse = data;
    return apiResponse;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}

// login Api
export async function login(username, password) {
  try {
    const requestBody = {
      username: username,
      password: password,
    };

    const response = await fetch(URL_CONFIG.url + API_CONFIG.login_api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const data = await response.json();
    const apiResponse = data;
    return apiResponse;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
}
