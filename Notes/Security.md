**HTTP Request** <br>
An HTTP (HyperText Transfer Protocol) request is a message sent by a client (e.g., browser, mobile app) to a server to request some data or perform an action.
<br>
![image](https://github.com/user-attachments/assets/e5b25819-700d-4d18-b18d-fbd7f782c527)
![image](https://github.com/user-attachments/assets/4519f19f-3d59-454f-87cf-75f26c3f50c7)

•	**GET is an HTTP request method** used to retrieve data from a server. **No body** is sent in a GET request.
![image](https://github.com/user-attachments/assets/c9dc3c5c-c72e-475f-a1f8-4db960baa07b)

•	**POST is an HTTP request method** used to send data to a server. **Data is sent in the request body**, not in the URL. Commonly used in forms, APIs, authentication, and data submission.
![image](https://github.com/user-attachments/assets/1f6c0359-c9e8-4aef-a7a4-6822da8dae00)
<br>
Here, we send user data (name, email) to the server. The server processes it and **creates a new user**.

**POST** request in HTML form <br>
![image](https://github.com/user-attachments/assets/d1331f0b-e91d-41fd-9bed-198d7a885444)

When the user submits the form, the **data is sent to the server** in the request body.
![image](https://github.com/user-attachments/assets/78fea19b-40fb-4366-bba1-72a02e160ab4)

**fetch?**
fetch() is a JavaScript function used to send HTTP requests. It supports all request methods (GET, POST, PUT, DELETE, etc.).
**It returns a Promise** that resolves to a Response object.
Fetch is same as xmlhttprequest that is used to make backend request but fetch uses promises. <br>	
![image](https://github.com/user-attachments/assets/0e7f5fb7-9b2f-4149-90b9-528e70f797a1)
![image](https://github.com/user-attachments/assets/466086c8-faf4-4849-a5ef-85563f162c0f)
![image](https://github.com/user-attachments/assets/215efd88-fa16-499e-a09a-4afcb9a2e8ec)
![image](https://github.com/user-attachments/assets/7bbb08fb-0c2d-4dd1-8690-dd9cd8f64882)

What type of data we are sending to our json <br>
![image](https://github.com/user-attachments/assets/120391ca-75be-4a06-b478-17d4d951d6e2)

Fetch? It is an API given by browsers to us to make external calls. In below example we will use fetch function to make an API call to github servers and we will get a user info with us.
![image](https://github.com/user-attachments/assets/94c50de1-faf6-49b5-88f2-77f3154d8032)
![image](https://github.com/user-attachments/assets/95e5ced8-705d-4d43-afaf-74e9421a0d44)


XSS (Cross-Site Scripting)
It is a security vulnerability where an attacker injects malicious scripts (JavaScript) into a trusted website.
When other users visit that page, the malicious script runs in their browser — without their permission.
 

How does XSS happen?
Suppose there is a website with a comment section.
When a user submits a comment, the website directly adds the comment to the page without cleaning it. (FYI, this is a dom based XSS)
 
Now, when a user writes something and clicks "Post Comment", the comment is inserted into the page using innerHTML. No filtering or escaping is done.

Attacker enter this as a comment: <script>alert('You are hacked!')</script>
Result on the page: <p><script>alert('You are hacked!')</script></p>
Browser sees <script> tag and executes it immediately.

Instead of just alert, attackers can: Steal cookies, Redirect users to phishing sites, Install malware, Steal sessions.

How to fix/prevent XSS?
Instead of innerHTML, use textContent:
 

Or use a library like DOMPurify to sanitize the input
 
Sanitize the input: Remove or escape any potentially dangerous characters.
Set HTTP Headers like Content-Security-Policy (CSP) to restrict what scripts can run.
Use innerText/textContent instead of innerHTML if you don't need HTML interpretation.
Validate input on both client and server side

Types of XSS attacks:
1. Stored XSS
Malicious script is stored permanently in the server/database (like in a comment, profile info, etc).
When other users visit the page, the malicious script automatically executes. 
Example: Imagine a comment section: A user submits a blog comment.
The comment is saved to the database without sanitization. When another user views the blog, the malicious script runs.
 
Frontend rendering the comment
 
Malicious input
 
The script is saved in the DB and runs every time someone views the comment section

Stored XSS is the most dangerous because it affects many users without them doing anything.

2. Reflected XSS
Occurs when malicious scripts are embedded in a URL, which executes when the URL is visited.
Example: Attack link → http://site.com/?name=<script>alert('hacked')</script>

Imagine a website shows the search keyword from the URL:
 
Now, attacker shares a fake URL like:
 
When user clicks the link, the script executes immediately.

Reflected XSS needs social engineering — user must click on a bad link

3. DOM-based XSS
Happens purely on the client-side (browser), using JavaScript DOM manipulation.
Example: A JS code that trusts location.search and directly inserts it into innerHTML.
 
Now if someone opens:
 
As soon as page loads, the script runs.

In DOM XSS, attack happens inside browser memory, no request goes to server.

CSRF (Cross-Site Request Forgery)
CSRF is an attack where a trusted user’s browser is tricked into making an unwanted request to a web application where the user is already authenticated (logged in).
It forces the user to perform actions they didn’t intend to, like changing their email, making a purchase, or even transferring money.
How CSRF Happens (Step-by-Step)
User logs into a trusted website (like their bank account) — and their browser saves the login session via a cookie.
While still logged in, the user visits a malicious website (attacker's site).
That malicious site secretly sends a request (like a form submission) to the bank’s server, using the user's session cookie (because browser sends cookies automatically).
The bank's server trusts the session (because it sees the valid cookie) and executes the malicious action, thinking the request is legitimate.

In short,
CSRF = attacker tricks your browser into sending a request you didn't mean to send. Browser blindly attaches your login cookie to the request. Bank thinks it's a genuine request from you.

Example: Imagine you're logged into your bank website.
The attacker's website contains:
 
As soon as the user opens the malicious site, this request fires automatically!
Browser sends cookies with the request, so bank server thinks it's a real transfer request from the user.
How to Prevent CSRF?
Use CSRF Tokens
Every sensitive request (like form submit) should include a unique token.
Server verifies this token — if it’s missing or incorrect, it rejects the request.

SameSite Cookies
Set cookies with the SameSite attribute (Strict or Lax).
This prevents browsers from sending cookies along with cross-site requests.

Check Referer or Origin Headers
Server can check if the incoming request comes from its own domain.

Double Submit Cookies (advanced)
Send CSRF token both in cookie and in request body and validate on the server.

User Confirmation
For sensitive actions, ask for password re-entry or OTP (one-time password).
Problem	Solution
Browser sends cookies automatically	Use CSRF Token — a random string must be sent along with the form, checked on the server.
Browser allows cross-site cookie sending	Use SameSite cookie (SameSite=Strict or Lax) so cookies are not sent with cross-site requests.
No check where request comes from	Server can check Origin or Referer header to ensure the request is from its own website.

 

CORS (stands for Cross-Origin Resource Sharing)
It’s a way for your browser to allow or block web pages from requesting resources (like data, APIs, etc.) from another domain (origin).
By default, browsers don't allow requests between two different domains. That’s called the Same-Origin Policy (SOP).
Same Origin → same protocol (http/https) + same domain + same port.
If anything is different → it’s a Cross-Origin request.
Page URL	Request URL	Allowed?
https://mywebsite.com	https://mywebsite.com/api/data	✅ (Same origin)
https://mywebsite.com	https://anotherwebsite.com/api/data	❌ (Cross origin)


Why was CORS Introduced?
Because in real life:
You may want your frontend (like React app) on http://localhost:3000 to call an API server running at http://localhost:5000.
OR Your site on https://shop.com wants to request data from https://api.shop.com.

Without CORS, browser will block these.
With CORS, the server can say: "It’s okay, I allow this other domain to access my data."

How Does CORS Work?
When browser detects a cross-origin request, it sends an extra request first → called a preflight request (HTTP OPTIONS method).
This checks "Is it okay if I access this resource?”
Server responds with special CORS headers like:
 
If server allows, browser proceeds. If server denies, browser blocks the response.

Another example: Suppose your frontend on http://abc.com wants data from http://xyz.com
 
If xyz.com server does not send Access-Control-Allow-Origin header, browser blocks this fetch call.

Why Browser Blocks It?
To protect users from malicious sites trying to steal data (hijacking sessions, etc.)
CORS is a security feature enforced by browsers, not by servers.

In short, 
CORS is a browser security feature that restricts web pages from making requests to a different domain, unless that domain explicitly allows it through specific HTTP headers.

Common CORS Errors
No 'Access-Control-Allow-Origin' header present. 
The CORS policy does not allow access from this origin.

CSP (stands for Content Security Policy)
It’s a security mechanism that helps prevent attacks like: XSS (Cross Site Scripting), Data injection attacks.

CSP is like a rulebook you give to the browser, saying: “Hey Browser, only load scripts, images, styles, fonts, etc. from these trusted places.”
If anything tries to load outside your trusted sources- Browser blocks it immediately.

Why CSP is Important?
Stops hackers from injecting bad scripts into your page. Even if someone somehow injects malicious code, CSP can block its execution. It reduces the risk of XSS attacks massively.

How CSP Works?
Server sends a special HTTP Response Header:
 
These rules tell the browser: From where it can load scripts, images, CSS, fonts, etc.

Example: Server sends:
 
'self' → allow scripts from the same domain.
https://apis.google.com → allow scripts from Google APIs.
Block all other scripts from random sites!

How to Implement CSP?
You can set CSP:
From HTTP Headers (best way for real sites) OR inside your HTML using <meta> tag:
 
But using HTTP headers is safer because HTML <meta> can itself be modified by attackers.
Without CSP	With CSP
Anyone can inject scripts easily.	Only trusted sources are allowed.
Big XSS attack risk.	XSS risk becomes very low.
No control over 3rd party stuff.	Full control over what loads.


