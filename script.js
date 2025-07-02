// Theme Toggle
function toggleTheme() {
	const body = document.body;
	const themeToggle = document.querySelector('.theme-toggle');

	if (body.getAttribute('data-theme') === 'dark') {
		body.removeAttribute('data-theme');
		themeToggle.textContent = '🌙';
	} else {
		body.setAttribute('data-theme', 'dark');
		themeToggle.textContent = '☀️';
	}
}

// Navigation
// script.js

function showSection(sectionId) {
	showLoading(); // spinner on

	setTimeout(() => {
		// Hide all sections
		document.querySelectorAll('.section').forEach(section => {
			section.classList.remove('active');
		});

		// Show target section
		const target = document.getElementById(sectionId);
		target.classList.add('active');
		target.classList.add('fade-in');
		targetSection.classList.add('fade-in');
		setTimeout(() => targetSection.classList.remove('fade-in'), 400);


		// tools-grid move
		const mainToolsGrid = document.getElementById('tools-grid');
		if (sectionId === 'tools') {
			const toolsContainer = document.querySelector('#tools .container');
			toolsContainer.insertBefore(mainToolsGrid, toolsContainer.firstChild);
		} else if (sectionId === 'home') {
			const homeContainer = document.querySelector('#home .container');
			homeContainer.insertBefore(mainToolsGrid, document.querySelector('#home .hero').nextSibling);
		}

		hideLoading(); // spinner off
	}, 800);
}


function showAllTools() {
	showLoading();

	setTimeout(() => {
		const tools = document.querySelectorAll('.tool-interface');
		tools.forEach(tool => tool.classList.add('hidden'));

		const grid = document.getElementById('tools-grid');
		grid.style.display = 'grid';
		grid.classList.add('fade-in');

		document.getElementById('backToTools').style.display = 'none';

		hideLoading();
	}, 1000);
}



function showTool(toolId) {
	const isHome = document.getElementById('home').classList.contains('active');
	if (isHome) {
		showToolMessage("To use this tool, please go to the Tools tab.");
		return;
	}

	showLoading();

	setTimeout(() => {
		document.getElementById('tools-grid').style.display = 'none';
		document.getElementById('backToTools').style.display = 'block';

		const tools = document.querySelectorAll('.tool-interface');
		tools.forEach(tool => tool.classList.add('hidden'));

		const activeTool = document.getElementById(toolId);
		activeTool.classList.remove('hidden');
		activeTool.classList.add('fade-in');

		hideLoading();
	}, 1000);
}




// Text Tools
function textToUpperCase() {
	const text = document.getElementById('textInput').value;
	document.getElementById('textResult').textContent = text.toUpperCase();
}

function textToLowerCase() {
	const text = document.getElementById('textInput').value;
	document.getElementById('textResult').textContent = text.toLowerCase();
}

function textToTitleCase() {
	const text = document.getElementById('textInput').value;
	const titleCase = text.replace(/\w\S*/g, (txt) =>
		txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
	);
	document.getElementById('textResult').textContent = titleCase;
}

function countWords() {
	const text = document.getElementById('textInput').value;
	const wordCount = text.trim().split(/\s+/).filter(word => word.length > 0).length;
	const charCount = text.length;
	document.getElementById('textResult').innerHTML =
		`Words: ${wordCount}<br>Characters: ${charCount}<br>Characters (no spaces): ${text.replace(/\s/g, '').length}`;
}

function reverseText() {
	const text = document.getElementById('textInput').value;
	document.getElementById('textResult').textContent = text.split('').reverse().join('');
}

function removeSpaces() {
	const text = document.getElementById('textInput').value;
	document.getElementById('textResult').textContent = text.replace(/\s/g, '');
}

// Calculator
let calcExpression = '';

function appendToCalc(value) {
	calcExpression += value;
	document.getElementById('calcDisplay').value = calcExpression;
}

function clearCalc() {
	calcExpression = '';
	document.getElementById('calcDisplay').value = '';
}

function deleteLast() {
	calcExpression = calcExpression.slice(0, -1);
	document.getElementById('calcDisplay').value = calcExpression;
}

function calculateResult() {
	try {
		// Replace × with * for calculation
		const expression = calcExpression.replace(/×/g, '*');
		const result = eval(expression);
		document.getElementById('calcDisplay').value = result;
		calcExpression = result.toString();
	} catch (error) {
		document.getElementById('calcDisplay').value = 'Error';
		calcExpression = '';
	}
}

// Color Tools
function generateRandomColor() {
	const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
	document.getElementById('colorPicker').value = randomColor;
	document.getElementById('hexInput').value = randomColor;
	convertColor();
}

function convertColor() {
	const hex = document.getElementById('hexInput').value || document.getElementById('colorPicker').value;
	const r = parseInt(hex.substr(1, 2), 16);
	const g = parseInt(hex.substr(3, 2), 16);
	const b = parseInt(hex.substr(5, 2), 16);

	const rgb = `rgb(${r}, ${g}, ${b})`;
	const hsl = rgbToHsl(r, g, b);

	document.getElementById('colorResult').innerHTML = `
                <div style="background: ${hex}; width: 100px; height: 100px; border-radius: 10px; margin: 10px auto;"></div>
                <p><strong>HEX:</strong> ${hex}</p>
                <p><strong>RGB:</strong> ${rgb}</p>
                <p><strong>HSL:</strong> hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)</p>
            `;
}

function rgbToHsl(r, g, b) {
	r /= 255; g /= 255; b /= 255;
	const max = Math.max(r, g, b), min = Math.min(r, g, b);
	let h, s, l = (max + min) / 2;

	if (max === min) {
		h = s = 0;
	} else {
		const d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case r: h = (g - b) / d + (g < b ? 6 : 0); break;
			case g: h = (b - r) / d + 2; break;
			case b: h = (r - g) / d + 4; break;
		}
		h /= 6;
	}
	return {
		h: Math.round(h * 360),
		s: Math.round(s * 100),
		l: Math.round(l * 100)
	};
}

function generatePalette() {
	const baseColor = document.getElementById('colorPicker').value;
	const colors = [baseColor];

	for (let i = 1; i < 5; i++) {
		const hue = (parseInt(baseColor.substr(1), 16) + i * 60) % 360;
		const newColor = '#' + hue.toString(16).padStart(6, '0');
		colors.push(newColor);
	}

	let paletteHTML = '<div style="display: flex; gap: 10px; justify-content: center;">';
	colors.forEach(color => {
		paletteHTML += `<div style="background: ${color}; width: 60px; height: 60px; border-radius: 5px; display: flex; align-items: end; justify-content: center; font-size: 10px; color: white; text-shadow: 1px 1px 1px black;">${color}</div>`;
	});
	paletteHTML += '</div>';

	document.getElementById('colorResult').innerHTML = paletteHTML;
}

// Unit Converter
function convertUnit() {
	const value = parseFloat(document.getElementById('unitInput').value);
	const fromUnit = document.getElementById('fromUnit').value;
	const toUnit = document.getElementById('toUnit').value;

	if (isNaN(value)) {
		document.getElementById('unitResult').textContent = 'Please enter a valid number';
		return;
	}

	const conversions = {
		length: {
			meter: 1,
			kilometer: 0.001,
			centimeter: 100,
			inch: 39.3701,
			foot: 3.28084
		},
		weight: {
			kilogram: 1,
			gram: 1000,
			pound: 2.20462,
			ounce: 35.274
		},
		temperature: {
			celsius: (val, to) => {
				if (to === 'fahrenheit') return (val * 9 / 5) + 32;
				if (to === 'kelvin') return val + 273.15;
				return val;
			},
			fahrenheit: (val, to) => {
				if (to === 'celsius') return (val - 32) * 5 / 9;
				if (to === 'kelvin') return (val - 32) * 5 / 9 + 273.15;
				return val;
			},
			kelvin: (val, to) => {
				if (to === 'celsius') return val - 273.15;
				if (to === 'fahrenheit') return (val - 273.15) * 9 / 5 + 32;
				return val;
			}
		}
	};

	const unitType = document.getElementById('unitType').value;
	let result;

	if (unitType === 'temperature') {
		result = conversions[unitType][fromUnit](value, toUnit);
	} else {
		const baseValue = value / conversions[unitType][fromUnit];
		result = baseValue * conversions[unitType][toUnit];
	}

	document.getElementById('unitResult').textContent = `${value} ${fromUnit} = ${result.toFixed(4)} ${toUnit}`;
}

// QR Code Generator
function generateQR() {
	const text = document.getElementById('qrText').value;
	if (!text) {
		document.getElementById('qrResult').textContent = 'Please enter text or URL';
		return;
	}

	// Simple QR code using API
	const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
	document.getElementById('qrResult').innerHTML = `
                <div style="text-align: center;">
                    <img src="${qrUrl}" alt="QR Code" style="max-width: 200px; border: 1px solid var(--border-color); border-radius: 10px;">
                    <p style="margin-top: 1rem;">QR Code for: ${text}</p>
                </div>
            `;
}

// Password Generator
function generatePassword() {
	const length = document.getElementById('passwordLength').value;
	const includeUppercase = document.getElementById('includeUppercase').checked;
	const includeLowercase = document.getElementById('includeLowercase').checked;
	const includeNumbers = document.getElementById('includeNumbers').checked;
	const includeSymbols = document.getElementById('includeSymbols').checked;

	let charset = '';
	if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
	if (includeNumbers) charset += '0123456789';
	if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

	if (charset === '') {
		document.getElementById('passwordResult').textContent = 'Please select at least one character type';
		return;
	}

	let password = '';
	for (let i = 0; i < length; i++) {
		password += charset.charAt(Math.floor(Math.random() * charset.length));
	}

	document.getElementById('passwordResult').innerHTML = `
                <div style="display: flex; align-items: center; gap: 10px;">
                    <input type="text" value="${password}" readonly style="flex: 1; font-family: monospace; font-size: 14px;">
                    <button onclick="copyToClipboard('${password}')">Copy</button>
                </div>
                <p style="margin-top: 1rem;">Password strength: ${getPasswordStrength(password)}</p>
            `;
}

function getPasswordStrength(password) {
	let score = 0;
	if (password.length >= 8) score++;
	if (password.length >= 12) score++;
	if (/[a-z]/.test(password)) score++;
	if (/[A-Z]/.test(password)) score++;
	if (/[0-9]/.test(password)) score++;
	if (/[^A-Za-z0-9]/.test(password)) score++;

	if (score < 3) return 'Weak';
	if (score < 5) return 'Medium';
	return 'Strong';
}

function copyToClipboard(text) {
	navigator.clipboard.writeText(text).then(() => {
		alert('Password copied to clipboard!');
	});
}
// Number to Words
function convertNumberToWords() {
	const num = parseInt(document.getElementById('numberInput').value);
	if (isNaN(num)) {
		document.getElementById('numberWordsResult').textContent = 'Please enter a valid number';
		return;
	}
	fetch(`https://api.funtranslations.com/translate/numbers.json?text=${num}`)
		.then(res => res.json())
		.then(data => {
			document.getElementById('numberWordsResult').textContent = data.contents.translated;
		})
		.catch(() => {
			document.getElementById('numberWordsResult').textContent = 'Sorry, failed to convert';
		});
}


// Text Encryptor / Decryptor
function encryptText() {
	const text = document.getElementById('encryptInput').value;
	const encrypted = btoa(text);
	document.getElementById('encryptResult').textContent = `Encrypted: ${encrypted}`;
}

function decryptText() {
	const text = document.getElementById('encryptInput').value;
	try {
		const decrypted = atob(text);
		document.getElementById('encryptResult').textContent = `Decrypted: ${decrypted}`;
	} catch {
		document.getElementById('encryptResult').textContent = 'Invalid base64 string';
	}
}

// JSON Formatter
function formatJSON() {
	const jsonText = document.getElementById('jsonInput').value;
	try {
		const obj = JSON.parse(jsonText);
		const pretty = JSON.stringify(obj, null, 4);
		document.getElementById('jsonResult').textContent = pretty;
	} catch {
		document.getElementById('jsonResult').textContent = 'Invalid JSON';
	}
}
function convertBinary() {
	const input = document.getElementById('binaryInput').value.trim();
	const type = document.getElementById('binaryType').value;
	let result = '';

	if (type === 'bin2dec') {
		if (/^[01]+$/.test(input)) {
			result = parseInt(input, 2);
		} else {
			result = 'Invalid binary number';
		}
	} else {
		const num = parseInt(input);
		if (!isNaN(num)) {
			result = num.toString(2);
		} else {
			result = 'Invalid decimal number';
		}
	}

	document.getElementById('binaryResult').textContent = result;
}
function calculateAge() {
	const dob = new Date(document.getElementById('dob').value);
	if (!dob.getTime()) {
		document.getElementById('ageResult').textContent = 'Invalid date';
		return;
	}

	const today = new Date();
	let age = today.getFullYear() - dob.getFullYear();
	const m = today.getMonth() - dob.getMonth();

	if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
		age--;
	}

	document.getElementById('ageResult').textContent = `You are ${age} years old.`;
}
function calculateDays() {
	const d1 = new Date(document.getElementById('date1').value);
	const d2 = new Date(document.getElementById('date2').value);
	if (!d1.getTime() || !d2.getTime()) {
		document.getElementById('daysResult').textContent = 'Invalid dates';
		return;
	}

	const diff = Math.abs(d2 - d1);
	const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
	document.getElementById('daysResult').textContent = `${days} day(s) difference.`;
}
function sortAlphabetically() {
	const input = document.getElementById('sortInput').value;
	const words = input.split(',').map(w => w.trim()).filter(w => w.length > 0);
	const sorted = words.sort((a, b) => a.localeCompare(b));
	document.getElementById('sortResult').textContent = sorted.join(', ');
}
function countLines() {
	const input = document.getElementById('lineInput').value;
	const lines = input.split('\n').filter(line => line.trim() !== '');
	document.getElementById('lineResult').textContent = `Total lines: ${lines.length}`;
}

// FAQ Toggle
function toggleFAQ(element) {
	const answer = element.nextElementSibling;
	const icon = element.querySelector('span:last-child');

	if (answer.classList.contains('open')) {
		answer.classList.remove('open');
		icon.textContent = '+';
	} else {
		answer.classList.add('open');
		icon.textContent = '-';
	}
}

// Contact Form
function sendMessage() {
	const name = document.getElementById('contactName').value;
	const email = document.getElementById('contactEmail').value;
	const subject = document.getElementById('contactSubject').value;
	const message = document.getElementById('contactMessage').value;

	if (!name || !email || !subject || !message) {
		alert('Please fill in all required fields.');
		return;
	}

	// Email validation
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email)) {
		alert('Please enter a valid email address.');
		return;
	}

	// Simulate form submission
	alert(`Thank you ${name}! Your message has been sent successfully. We'll get back to you soon at ${email}.`);

	// Reset form
	document.getElementById('contactForm').reset();
}

// Contact form submission handler
document.addEventListener('DOMContentLoaded', function () {
	const contactForm = document.getElementById('contactForm');
	if (contactForm) {
		contactForm.addEventListener('submit', function (e) {
			e.preventDefault();
			sendMessage();
		});
	}
});

// Update password length display
document.getElementById('passwordLength').addEventListener('input', function () {
	document.getElementById('lengthDisplay').textContent = this.value;
});

// Color picker and hex input sync
document.getElementById('colorPicker').addEventListener('change', function () {
	document.getElementById('hexInput').value = this.value;
	convertColor();
});

document.getElementById('hexInput').addEventListener('input', function () {
	if (this.value.match(/^#[0-9A-F]{6}$/i)) {
		document.getElementById('colorPicker').value = this.value;
		convertColor();
	}
});
function convertToRoman() {
	let num = parseInt(document.getElementById("romanInput").value);
	if (isNaN(num) || num < 1 || num > 3999) {
		document.getElementById("romanResult").textContent = "Please enter a number between 1 and 3999.";
		return;
	}

	const romanMap = [
		{ val: 1000, sym: "M" },
		{ val: 900, sym: "CM" },
		{ val: 500, sym: "D" },
		{ val: 400, sym: "CD" },
		{ val: 100, sym: "C" },
		{ val: 90, sym: "XC" },
		{ val: 50, sym: "L" },
		{ val: 40, sym: "XL" },
		{ val: 10, sym: "X" },
		{ val: 9, sym: "IX" },
		{ val: 5, sym: "V" },
		{ val: 4, sym: "IV" },
		{ val: 1, sym: "I" },
	];

	let result = "";
	for (const { val, sym } of romanMap) {
		while (num >= val) {
			result += sym;
			num -= val;
		}
	}

	document.getElementById("romanResult").innerHTML = `<strong>Roman Numeral:</strong> ${result}`;
}

function checkPalindrome() {
	const text = document.getElementById("palindromeInput").value.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
	const reversed = text.split('').reverse().join('');
	const result = (text === reversed) ? "✅ It's a Palindrome!" : "❌ Not a Palindrome.";
	document.getElementById("palindromeResult").textContent = result;
}

let startTime = null;
const sampleText = "Your ultimate collection of useful online tools. All tools are free to use and work directly in your browser.";

function checkTypingSpeed() {
	const input = document.getElementById("typingInput").value;
	if (!startTime && input.length > 0) {
		startTime = new Date();
	}

	if (input === sampleText) {
		const endTime = new Date();
		const timeTaken = (endTime - startTime) / 1000; // seconds
		const words = sampleText.trim().split(/\s+/).length;
		const wpm = Math.round((words / timeTaken) * 60);
		document.getElementById("typingResult").textContent =
			`🎉 You typed ${words} words in ${timeTaken.toFixed(2)}s. Speed: ${wpm} WPM`;
	}
}
let countdownInterval;

function startCountdown() {
	const target = new Date(document.getElementById('countdownInput').value).getTime();
	const output = document.getElementById('countdownOutput');

	if (!target || isNaN(target)) {
		output.textContent = "Please select a valid future date.";
		return;
	}

	clearInterval(countdownInterval); // Clear previous countdowns
	countdownInterval = setInterval(() => {
		const now = Date.now();
		const diff = target - now;

		if (diff <= 0) {
			output.textContent = "⏰ Time's up!";
			clearInterval(countdownInterval);
			return;
		}

		const d = Math.floor(diff / (1000 * 60 * 60 * 24));
		const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
		const m = Math.floor((diff / (1000 * 60)) % 60);
		const s = Math.floor((diff / 1000) % 60);

		output.textContent = `${d}d ${h}h ${m}m ${s}s remaining`;
	}, 1000);
}

function resetCountdown() {
	clearInterval(countdownInterval);
	document.getElementById('countdownOutput').textContent = '';
	document.getElementById('countdownInput').value = '';
}
function calculateTip() {
	const bill = parseFloat(document.getElementById("bill").value);
	const tip = parseFloat(document.getElementById("tip").value);
	const people = parseInt(document.getElementById("people").value);

	if (isNaN(bill) || isNaN(tip) || isNaN(people) || people <= 0) {
		document.getElementById("tipResult").textContent = "❌ Please enter valid values.";
		return;
	}

	const tipAmount = bill * (tip / 100);
	const total = bill + tipAmount;
	const perPerson = total / people;

	document.getElementById("tipResult").textContent =
		`Total: ₹${total.toFixed(2)} | Each: ₹${perPerson.toFixed(2)}`;
}


// Unit type change handler
document.getElementById('unitType').addEventListener('change', function () {
	const unitType = this.value;
	const fromUnit = document.getElementById('fromUnit');
	const toUnit = document.getElementById('toUnit');

	let options = '';
	if (unitType === 'length') {
		options = `
                    <option value="meter">Meter</option>
                    <option value="kilometer">Kilometer</option>
                    <option value="centimeter">Centimeter</option>
                    <option value="inch">Inch</option>
                    <option value="foot">Foot</option>
                `;
	} else if (unitType === 'weight') {
		options = `
                    <option value="kilogram">Kilogram</option>
                    <option value="gram">Gram</option>
                    <option value="pound">Pound</option>
                    <option value="ounce">Ounce</option>
                `;
	} else if (unitType === 'temperature') {
		options = `
                    <option value="celsius">Celsius</option>
                    <option value="fahrenheit">Fahrenheit</option>
                    <option value="kelvin">Kelvin</option>
                `;
	}

	fromUnit.innerHTML = options;
	toUnit.innerHTML = options;
});

// Initialize
document.addEventListener('DOMContentLoaded', function () {
	setTimeout(() => {
	const banner = document.getElementById('welcomeBanner');
	banner.classList.add('show');
	setTimeout(() => banner.classList.remove('show'), 2500);
}, 500);

	// Set default theme
	if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
		document.body.setAttribute('data-theme', 'dark');
		document.querySelector('.theme-toggle').textContent = '☀️';
	}
});
function restartTypingTest() {
	startTime = null;
	document.getElementById("typingInput").value = "";
	document.getElementById("typingResult").textContent = "";
}
document.getElementById('toolSearch').addEventListener('input', function () {
	const query = this.value.toLowerCase();
	const tools = document.querySelectorAll('.tool-card');

	tools.forEach(tool => {
		const title = tool.querySelector('h3').textContent.toLowerCase();
		const description = tool.querySelector('p').textContent.toLowerCase();

		if (title.includes(query) || description.includes(query)) {
			tool.style.display = 'block';
		} else {
			tool.style.display = 'none';
		}
	});
});
// Jab scroll kare to button show ya hide hoga
window.addEventListener('scroll', () => {
	const btn = document.getElementById('scrollToTop');
	if (window.scrollY > 200) {
		btn.classList.add('show');
	} else {
		btn.classList.remove('show');
	}
});

function showToolMessage(message) {
	const box = document.getElementById('toolMessage');
	box.textContent = message;
	box.classList.remove('hidden');

	// Hide after 3 seconds
	setTimeout(() => {
		box.classList.add('hidden');
	}, 3000);
}



function showLoading() {
	const overlay = document.getElementById('loadingOverlay');
	overlay.classList.remove('hidden');
}

function hideLoading() {
	const overlay = document.getElementById('loadingOverlay');
	overlay.classList.add('hidden');
}

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./service-worker.js')
    .then(() => console.log('✅ Service Worker registered'))
    .catch(err => console.error('SW registration failed:', err));
}
document.getElementById('feedbackBtn').addEventListener('click', () => {
	window.open('https://forms.gle/XNKxKLsA5z2H9uP1A', '_blank');
});

document.getElementById('suggestBtn').addEventListener('click', () => {
	 window.open('https://forms.gle/6qxk7iZgnR1AKrjN6', '_blank');
	 });