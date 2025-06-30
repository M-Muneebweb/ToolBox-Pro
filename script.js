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
        function showSection(sectionId) {
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => section.classList.remove('active'));
            document.getElementById(sectionId).classList.add('active');
            
            // Hide all tools
            const tools = document.querySelectorAll('.tool-interface');
            tools.forEach(tool => tool.classList.add('hidden'));
        }

        function showTool(toolId) {
            showSection('tools');
            const tools = document.querySelectorAll('.tool-interface');
            tools.forEach(tool => tool.classList.add('hidden'));
            document.getElementById(toolId).classList.remove('hidden');
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
            const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
            document.getElementById('colorPicker').value = randomColor;
            document.getElementById('hexInput').value = randomColor;
            convertColor();
        }

        function convertColor() {
            const hex = document.getElementById('hexInput').value || document.getElementById('colorPicker').value;
            const r = parseInt(hex.substr(1,2), 16);
            const g = parseInt(hex.substr(3,2), 16);
            const b = parseInt(hex.substr(5,2), 16);
            
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
                        if (to === 'fahrenheit') return (val * 9/5) + 32;
                        if (to === 'kelvin') return val + 273.15;
                        return val;
                    },
                    fahrenheit: (val, to) => {
                        if (to === 'celsius') return (val - 32) * 5/9;
                        if (to === 'kelvin') return (val - 32) * 5/9 + 273.15;
                        return val;
                    },
                    kelvin: (val, to) => {
                        if (to === 'celsius') return val - 273.15;
                        if (to === 'fahrenheit') return (val - 273.15) * 9/5 + 32;
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
            alert('Thank you for your message! We will get back to you soon.');
        }

        // Update password length display
        document.getElementById('passwordLength').addEventListener('input', function() {
            document.getElementById('lengthDisplay').textContent = this.value;
        });

        // Color picker and hex input sync
        document.getElementById('colorPicker').addEventListener('change', function() {
            document.getElementById('hexInput').value = this.value;
            convertColor();
        });

        document.getElementById('hexInput').addEventListener('input', function() {
            if (this.value.match(/^#[0-9A-F]{6}$/i)) {
                document.getElementById('colorPicker').value = this.value;
                convertColor();
            }
        });

        // Unit type change handler
        document.getElementById('unitType').addEventListener('change', function() {
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
        document.addEventListener('DOMContentLoaded', function() {
            // Set default theme
            if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.body.setAttribute('data-theme', 'dark');
                document.querySelector('.theme-toggle').textContent = '☀️';
            }
        });