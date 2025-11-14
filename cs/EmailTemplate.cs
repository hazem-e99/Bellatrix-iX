namespace Bellatrix.Shared
{
    public static class EmailTemplate
    {
        public static string EmailConfirmationBodyTemplate(string recipientName, string confirmationCode, string companyName = "Your App", int expiryMinutes = 15)
        {
            return $@"
            <!DOCTYPE html>
            <html lang='en' dir='ltr'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <title>Email Confirmation - {companyName}</title>
                <style>
                    * {{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }}
                    
                    body {{
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.7;
                        color: #1a202c;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 20px 0;
                        margin: 0;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }}
                    
                    .email-wrapper {{
                        max-width: 650px;
                        margin: 0 auto;
                        background: transparent;
                    }}
                    
                    .email-container {{
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        margin: 20px;
                    }}
                    
                    .header {{
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        padding: 50px 40px;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }}
                    
                    .header::before {{
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                        background-size: 30px 30px;
                        animation: moveBackground 20s linear infinite;
                        opacity: 0.3;
                    }}
                    
                    @keyframes moveBackground {{
                        0% {{ transform: translate(0, 0); }}
                        100% {{ transform: translate(30px, 30px); }}
                    }}
                    
                    .header-icon {{
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 20px;
                        background: rgba(255, 255, 255, 0.25);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 40px;
                        backdrop-filter: blur(10px);
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .header h1 {{
                        font-size: 32px;
                        margin: 0 0 12px 0;
                        font-weight: 700;
                        color: white;
                        letter-spacing: -0.5px;
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .header p {{
                        font-size: 17px;
                        color: rgba(255, 255, 255, 0.95);
                        margin: 0;
                        font-weight: 500;
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .content {{
                        padding: 50px 40px;
                        background: #ffffff;
                    }}
                    
                    .greeting {{
                        font-size: 22px;
                        margin-bottom: 25px;
                        color: #1a202c;
                        font-weight: 600;
                    }}
                    
                    .message {{
                        font-size: 16px;
                        margin-bottom: 30px;
                        line-height: 1.8;
                        color: #4a5568;
                    }}
                    
                    .code-container {{
                        text-align: center;
                        margin: 40px 0;
                        padding: 45px 35px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        border-radius: 16px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 10px 40px rgba(102, 126, 234, 0.4);
                    }}
                    
                    .code-container::before {{
                        content: '';
                        position: absolute;
                        top: -2px;
                        left: -2px;
                        right: -2px;
                        bottom: -2px;
                        background: linear-gradient(45deg, #667eea, #764ba2, #667eea);
                        border-radius: 16px;
                        z-index: 0;
                        opacity: 0;
                        animation: borderGlow 3s ease-in-out infinite;
                    }}
                    
                    @keyframes borderGlow {{
                        0%, 100% {{ opacity: 0; }}
                        50% {{ opacity: 1; }}
                    }}
                    
                    .code-container::after {{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                        animation: shine 3s infinite;
                    }}
                    
                    @keyframes shine {{
                        0% {{ left: -100%; }}
                        50%, 100% {{ left: 100%; }}
                    }}
                    
                    .code-label {{
                        font-size: 13px;
                        color: rgba(255, 255, 255, 0.9);
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        font-weight: 600;
                        position: relative;
                        z-index: 2;
                    }}
                    
                    .confirmation-code {{
                        font-size: 48px;
                        font-weight: 800;
                        letter-spacing: 12px;
                        color: white;
                        font-family: 'Courier New', Consolas, monospace;
                        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                        position: relative;
                        z-index: 2;
                        background: rgba(255, 255, 255, 0.15);
                        padding: 20px 30px;
                        border-radius: 12px;
                        display: inline-block;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        backdrop-filter: blur(10px);
                    }}
                    
                    .expiry-info {{
                        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                        border: 2px solid #fbbf24;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 30px 0;
                        font-size: 15px;
                        color: #92400e;
                        text-align: center;
                        font-weight: 600;
                        box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
                    }}
                    
                    .expiry-info strong {{
                        color: #78350f;
                        font-weight: 700;
                    }}
                    
                    .instructions {{
                        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                        border-left: 5px solid #667eea;
                        padding: 25px 30px;
                        margin: 30px 0;
                        border-radius: 12px;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.1);
                    }}
                    
                    .instructions h3 {{
                        color: #667eea;
                        margin-bottom: 15px;
                        font-size: 18px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                    }}
                    
                    .instructions h3::before {{
                        content: '📋';
                        margin-right: 10px;
                        font-size: 20px;
                    }}
                    
                    .instructions ol {{
                        margin-left: 20px;
                        color: #4a5568;
                        line-height: 2;
                    }}
                    
                    .instructions li {{
                        margin-bottom: 10px;
                        font-size: 15px;
                        padding-left: 10px;
                    }}
                    
                    .instructions li::marker {{
                        color: #667eea;
                        font-weight: bold;
                    }}
                    
                    .security-notice {{
                        background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
                        border: 2px solid #3b82f6;
                        border-radius: 12px;
                        padding: 20px 25px;
                        margin: 30px 0;
                        font-size: 14px;
                        color: #1e40af;
                        box-shadow: 0 4px 15px rgba(59, 130, 246, 0.15);
                    }}
                    
                    .security-notice strong {{
                        color: #1e3a8a;
                        font-weight: 700;
                        display: inline-flex;
                        align-items: center;
                    }}
                    
                    .divider {{
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
                        margin: 35px 0;
                    }}
                    
                    .footer {{
                        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                        color: #e5e7eb;
                        padding: 40px 40px 35px;
                        text-align: center;
                        border-top: 3px solid #667eea;
                    }}
                    
                    .footer p {{
                        font-size: 14px;
                        margin: 0 0 12px 0;
                        color: #d1d5db;
                    }}
                    
                    .footer p:last-child {{
                        margin-bottom: 0;
                        color: #9ca3af;
                        font-size: 13px;
                    }}
                    
                    .footer-logo {{
                        font-size: 24px;
                        font-weight: 700;
                        margin-bottom: 15px;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }}
                    
                    @media (max-width: 600px) {{
                        .email-container {{
                            margin: 10px;
                            border-radius: 15px;
                        }}
                        
                        .header {{
                            padding: 35px 25px;
                        }}
                        
                        .header h1 {{
                            font-size: 26px;
                        }}
                        
                        .header-icon {{
                            width: 65px;
                            height: 65px;
                            font-size: 32px;
                        }}
                        
                        .content {{
                            padding: 35px 25px;
                        }}
                        
                        .greeting {{
                            font-size: 19px;
                        }}
                        
                        .message {{
                            font-size: 15px;
                        }}
                        
                        .confirmation-code {{
                            font-size: 36px;
                            letter-spacing: 6px;
                            padding: 15px 20px;
                        }}
                        
                        .code-container {{
                            padding: 30px 20px;
                            margin: 30px 0;
                        }}
                        
                        .instructions {{
                            padding: 20px;
                        }}
                        
                        .footer {{
                            padding: 30px 25px;
                        }}
                    }}
                </style>
            </head>
            <body>
                <div class='email-wrapper'>
                    <div class='email-container'>
                        <div class='header'>
                            <div class='header-icon'>✉️</div>
                            <h1>{companyName}</h1>
                            <p>Email Verification Required</p>
                        </div>
            
                        <div class='content'>
                            <div class='greeting'>
                                Hello {recipientName},
                            </div>
                
                            <div class='message'>
                                Thank you for signing up! To complete your registration and secure your account, please verify your email address using the confirmation code below.
                            </div>
                
                            <div class='code-container'>
                                <div class='code-label'>Your Confirmation Code</div>
                                <div class='confirmation-code'>{confirmationCode}</div>
                            </div>
                
                            <div class='expiry-info'>
                                ⏱️ This code will expire in <strong>{expiryMinutes} minutes</strong> for your security.
                            </div>
                
                            <div class='instructions'>
                                <h3>How to use this code:</h3>
                                <ol>
                                    <li>Return to the {companyName} application</li>
                                    <li>Enter the 6-digit code exactly as shown above</li>
                                    <li>Click ""Verify Email"" to complete your registration</li>
                                </ol>
                            </div>
                
                            <div class='divider'></div>
                
                            <div class='security-notice'>
                                <strong>🔒 Security Note:</strong> If you didn't request this verification code, please ignore this email. Your account remains secure and no action is required.
                            </div>
                        </div>
            
                        <div class='footer'>
                            <div class='footer-logo'>{companyName}</div>
                            <p>This is an automated message from {companyName}</p>
                            <p>Please do not reply to this email</p>
                            <p>&copy; {DateTime.Now.Year} {companyName}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
        }

        public static string GetPasswordResetEmailBody(string userName, string resetToken, string email, string companyName = "Web Application")
        {
            // You'll need to replace this with your actual password reset URL
            var resetUrl = $"https://your-app-domain.com/reset-password?token={resetToken}&email={email}";

            return $@"
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Password Reset Request</title>
                <style>
                    * {{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }}
                    body {{
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f4f4f4;
                    }}
                    .email-container {{
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    }}
                    .reset-header {{
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        padding: 40px 30px;
                        text-align: center;
                        color: white;
                    }}
                    .reset-header h1 {{
                        font-size: 28px;
                        margin-bottom: 10px;
                        font-weight: 300;
                    }}
                    .reset-header p {{
                        font-size: 16px;
                        opacity: 0.9;
                    }}
                    .content {{
                        padding: 40px 30px;
                    }}
                    .greeting {{
                        font-size: 18px;
                        margin-bottom: 20px;
                        color: #2c3e50;
                    }}
                    .message {{
                        font-size: 16px;
                        margin-bottom: 30px;
                        line-height: 1.8;
                        color: #555;
                    }}
                    .button-container {{
                        text-align: center;
                        margin: 30px 0;
                    }}
                    .btn {{
                        display: inline-block;
                        padding: 15px 30px;
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        color: white;
                        text-decoration: none;
                        border-radius: 25px;
                        font-size: 16px;
                        font-weight: 600;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(37, 99, 235, 0.4);
                    }}
                    .btn:hover {{
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(37, 99, 235, 0.6);
                    }}
                    .expiry-info {{
                        background: #fff3cd;
                        border: 1px solid #ffeaa7;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 25px 0;
                        font-size: 14px;
                        color: #856404;
                        text-align: center;
                    }}
                    .security-notice {{
                        background: #f8d7da;
                        border: 1px solid #f5c6cb;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 20px 0;
                        font-size: 13px;
                        color: #721c24;
                    }}
                    .security-notice strong {{
                        color: #721c24;
                    }}
                    .footer {{
                        background: #1f2937;
                        color: #ecf0f1;
                        padding: 30px;
                        text-align: center;
                    }}
                    .footer p {{
                        font-size: 14px;
                        margin-bottom: 10px;
                    }}
                    @media (max-width: 600px) {{
                        .email-container {{
                            margin: 10px;
                            border-radius: 5px;
                        }}
                        .reset-header {{
                            padding: 30px 20px;
                        }}
                        .content {{
                            padding: 30px 20px;
                        }}
                        .btn {{
                            padding: 12px 25px;
                            font-size: 14px;
                        }}
                    }}
                </style>
            </head>
            <body>
                <div class='email-container'>
                    <div class='reset-header'>
                        <h1>{companyName}</h1>
                        <p>Password Reset Request</p>
                    </div>
        
                    <div class='content'>
                        <div class='greeting'>
                            Hello {userName},
                        </div>
            
                        <div class='message'>
                            We received a request to reset your password for your {companyName} account. If you made this request, please click the button below to reset your password.
                        </div>
            
                        <div class='button-container'>
                            <a href='{resetUrl}' class='btn'>Reset My Password</a>
                        </div>
            
                        <div class='expiry-info'>
                            ⏱️ This password reset link will expire in <strong>1 hour</strong> for your security.
                        </div>
            
                        <div class='security-notice'>
                            <strong>🔒 Security Notice:</strong> If you did not request a password reset, please ignore this email and consider changing your password as a precaution. Your account remains secure.
                        </div>
            
                        <div class='message'>
                            If the button above doesn't work, you can copy and paste the following link into your browser:
                            <br><br>
                            <code>{resetUrl}</code>
                        </div>
                    </div>
        
                    <div class='footer'>
                        <p>This is an automated message from {companyName}</p>
                        <p>Please do not reply to this email</p>
                        <p>&copy; {DateTime.Now.Year} {companyName}. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>";
        }

        public static string PasswordResetCodeEmailBodyTemplate(string recipientName, string resetCode, string companyName = "Your App",int expiryMinutes = 15)
        {
            return $@"
            <!DOCTYPE html>
            <html lang='en' dir='ltr'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <title>Password Reset - {companyName}</title>
                <style>
                    * {{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }}
                    
                    body {{
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.7;
                        color: #1a202c;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        padding: 20px 0;
                        margin: 0;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }}
                    
                    .email-wrapper {{
                        max-width: 650px;
                        margin: 0 auto;
                        background: transparent;
                    }}
                    
                    .email-container {{
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        margin: 20px;
                    }}
                    
                    .header {{
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        padding: 50px 40px;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }}
                    
                    .header::before {{
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                        background-size: 30px 30px;
                        animation: moveBackground 20s linear infinite;
                        opacity: 0.3;
                    }}
                    
                    @keyframes moveBackground {{
                        0% {{ transform: translate(0, 0); }}
                        100% {{ transform: translate(30px, 30px); }}
                    }}
                    
                    .header-icon {{
                        width: 80px;
                        height: 80px;
                        margin: 0 auto 20px;
                        background: rgba(255, 255, 255, 0.25);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 40px;
                        backdrop-filter: blur(10px);
                        border: 3px solid rgba(255, 255, 255, 0.3);
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .header h1 {{
                        font-size: 32px;
                        margin: 0 0 12px 0;
                        font-weight: 700;
                        color: white;
                        letter-spacing: -0.5px;
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .header p {{
                        font-size: 17px;
                        color: rgba(255, 255, 255, 0.95);
                        margin: 0;
                        font-weight: 500;
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .content {{
                        padding: 50px 40px;
                        background: #ffffff;
                    }}
                    
                    .greeting {{
                        font-size: 22px;
                        margin-bottom: 25px;
                        color: #1a202c;
                        font-weight: 600;
                    }}
                    
                    .message {{
                        font-size: 16px;
                        margin-bottom: 30px;
                        line-height: 1.8;
                        color: #4a5568;
                    }}
                    
                    .code-container {{
                        text-align: center;
                        margin: 40px 0;
                        padding: 45px 35px;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        border-radius: 16px;
                        position: relative;
                        overflow: hidden;
                        box-shadow: 0 10px 40px rgba(240, 147, 251, 0.4);
                    }}
                    
                    .code-container::after {{
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%;
                        width: 100%;
                        height: 100%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
                        animation: shine 3s infinite;
                    }}
                    
                    @keyframes shine {{
                        0% {{ left: -100%; }}
                        50%, 100% {{ left: 100%; }}
                    }}
                    
                    .code-label {{
                        font-size: 13px;
                        color: rgba(255, 255, 255, 0.9);
                        margin-bottom: 15px;
                        text-transform: uppercase;
                        letter-spacing: 2px;
                        font-weight: 600;
                        position: relative;
                        z-index: 2;
                    }}
                    
                    .reset-code {{
                        font-size: 48px;
                        font-weight: 800;
                        letter-spacing: 12px;
                        color: white;
                        font-family: 'Courier New', Consolas, monospace;
                        text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                        position: relative;
                        z-index: 2;
                        background: rgba(255, 255, 255, 0.15);
                        padding: 20px 30px;
                        border-radius: 12px;
                        display: inline-block;
                        border: 2px solid rgba(255, 255, 255, 0.3);
                        backdrop-filter: blur(10px);
                    }}
                    
                    .expiry-info {{
                        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
                        border: 2px solid #fbbf24;
                        border-radius: 12px;
                        padding: 20px;
                        margin: 30px 0;
                        font-size: 15px;
                        color: #92400e;
                        text-align: center;
                        font-weight: 600;
                        box-shadow: 0 4px 15px rgba(251, 191, 36, 0.2);
                    }}
                    
                    .expiry-info strong {{
                        color: #78350f;
                        font-weight: 700;
                    }}
                    
                    .security-notice {{
                        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                        border: 2px solid #ef4444;
                        border-radius: 12px;
                        padding: 20px 25px;
                        margin: 30px 0;
                        font-size: 14px;
                        color: #991b1b;
                        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.15);
                    }}
                    
                    .security-notice strong {{
                        color: #7f1d1d;
                        font-weight: 700;
                        display: inline-flex;
                        align-items: center;
                    }}
                    
                    .divider {{
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
                        margin: 35px 0;
                    }}
                    
                    .footer {{
                        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                        color: #e5e7eb;
                        padding: 40px 40px 35px;
                        text-align: center;
                        border-top: 3px solid #f093fb;
                    }}
                    
                    .footer p {{
                        font-size: 14px;
                        margin: 0 0 12px 0;
                        color: #d1d5db;
                    }}
                    
                    .footer p:last-child {{
                        margin-bottom: 0;
                        color: #9ca3af;
                        font-size: 13px;
                    }}
                    
                    .footer-logo {{
                        font-size: 24px;
                        font-weight: 700;
                        margin-bottom: 15px;
                        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }}
                    
                    @media (max-width: 600px) {{
                        .email-container {{
                            margin: 10px;
                            border-radius: 15px;
                        }}
                        
                        .header {{
                            padding: 35px 25px;
                        }}
                        
                        .header h1 {{
                            font-size: 26px;
                        }}
                        
                        .header-icon {{
                            width: 65px;
                            height: 65px;
                            font-size: 32px;
                        }}
                        
                        .content {{
                            padding: 35px 25px;
                        }}
                        
                        .greeting {{
                            font-size: 19px;
                        }}
                        
                        .message {{
                            font-size: 15px;
                        }}
                        
                        .reset-code {{
                            font-size: 36px;
                            letter-spacing: 6px;
                            padding: 15px 20px;
                        }}
                        
                        .code-container {{
                            padding: 30px 20px;
                            margin: 30px 0;
                        }}
                        
                        .footer {{
                            padding: 30px 25px;
                        }}
                    }}
                </style>
            </head>
            <body>
                <div class='email-wrapper'>
                    <div class='email-container'>
                        <div class='header'>
                            <div class='header-icon'>🔐</div>
                            <h1>{companyName}</h1>
                            <p>Password Reset Verification</p>
                        </div>

                        <div class='content'>
                            <div class='greeting'>
                                Hello {recipientName},
                            </div>

                            <div class='message'>
                                We received a request to reset your password. Please use the verification code below to proceed with resetting your password.
                            </div>

                            <div class='code-container'>
                                <div class='code-label'>Your Reset Code</div>
                                <div class='reset-code'>{resetCode}</div>
                            </div>

                            <div class='expiry-info'>
                                ⏱️ This code will expire in <strong>{expiryMinutes} minutes</strong> for your security.
                            </div>

                            <div class='divider'></div>

                            <div class='security-notice'>
                                <strong>🔒 Security Notice:</strong> If you did not request a password reset, please ignore this email. Your account remains secure and no further action is required.
                            </div>
                        </div>

                        <div class='footer'>
                            <div class='footer-logo'>{companyName}</div>
                            <p>This is an automated message from {companyName}</p>
                            <p>Please do not reply to this email</p>
                            <p>&copy; {DateTime.Now.Year} {companyName}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
        }

        public static string GetPasswordResetConfirmationEmailBody(string userName, string companyName = "Web Application")
        {
            return $@"
            <!DOCTYPE html>
            <html lang='en' dir='ltr'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <meta http-equiv='X-UA-Compatible' content='IE=edge'>
                <title>Password Changed Successfully - {companyName}</title>
                <style>
                    * {{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }}
                    
                    body {{
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
                        line-height: 1.7;
                        color: #1a202c;
                        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                        padding: 20px 0;
                        margin: 0;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                    }}
                    
                    .email-wrapper {{
                        max-width: 650px;
                        margin: 0 auto;
                        background: transparent;
                    }}
                    
                    .email-container {{
                        background: #ffffff;
                        border-radius: 20px;
                        overflow: hidden;
                        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
                        margin: 20px;
                    }}
                    
                    .success-header {{
                        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                        padding: 50px 40px;
                        text-align: center;
                        position: relative;
                        overflow: hidden;
                    }}
                    
                    .success-header::before {{
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
                        background-size: 30px 30px;
                        animation: moveBackground 20s linear infinite;
                        opacity: 0.3;
                    }}
                    
                    @keyframes moveBackground {{
                        0% {{ transform: translate(0, 0); }}
                        100% {{ transform: translate(30px, 30px); }}
                    }}
                    
                    .success-header h1 {{
                        font-size: 32px;
                        margin: 0 0 12px 0;
                        font-weight: 700;
                        color: white;
                        letter-spacing: -0.5px;
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .success-header p {{
                        font-size: 17px;
                        color: rgba(255, 255, 255, 0.95);
                        margin: 0;
                        font-weight: 500;
                        position: relative;
                        z-index: 1;
                    }}
                    
                    .content {{
                        padding: 50px 40px;
                        background: #ffffff;
                    }}
                    
                    .greeting {{
                        font-size: 22px;
                        margin-bottom: 25px;
                        color: #1a202c;
                        font-weight: 600;
                    }}
                    
                    .message {{
                        font-size: 16px;
                        margin-bottom: 25px;
                        line-height: 1.8;
                        color: #4a5568;
                    }}
                    
                    .success-icon {{
                        text-align: center;
                        margin: 35px 0;
                        padding: 30px;
                    }}
                    
                    .success-icon .checkmark {{
                        width: 100px;
                        height: 100px;
                        margin: 0 auto;
                        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                        border-radius: 50%;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 50px;
                        color: white;
                        box-shadow: 0 10px 40px rgba(17, 153, 142, 0.4);
                        animation: successPulse 2s ease-in-out infinite;
                    }}
                    
                    @keyframes successPulse {{
                        0%, 100% {{
                            transform: scale(1);
                            box-shadow: 0 10px 40px rgba(17, 153, 142, 0.4);
                        }}
                        50% {{
                            transform: scale(1.05);
                            box-shadow: 0 15px 50px rgba(17, 153, 142, 0.6);
                        }}
                    }}
                    
                    .info-box {{
                        background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
                        border-left: 5px solid #11998e;
                        border-radius: 12px;
                        padding: 20px 25px;
                        margin: 30px 0;
                        box-shadow: 0 4px 15px rgba(17, 153, 142, 0.1);
                    }}
                    
                    .info-box strong {{
                        color: #0f766e;
                        font-weight: 700;
                    }}
                    
                    .security-tips {{
                        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
                        border: 2px solid #10b981;
                        border-radius: 12px;
                        padding: 25px 30px;
                        margin: 30px 0;
                        box-shadow: 0 4px 15px rgba(16, 185, 129, 0.15);
                    }}
                    
                    .security-tips h3 {{
                        color: #065f46;
                        margin-bottom: 18px;
                        font-size: 18px;
                        font-weight: 700;
                        display: flex;
                        align-items: center;
                    }}
                    
                    .security-tips h3::before {{
                        content: '🔐';
                        margin-right: 10px;
                        font-size: 22px;
                    }}
                    
                    .security-tips ul {{
                        margin-left: 25px;
                        color: #047857;
                        line-height: 2;
                    }}
                    
                    .security-tips li {{
                        margin-bottom: 10px;
                        font-size: 15px;
                        padding-left: 5px;
                    }}
                    
                    .security-tips li::marker {{
                        color: #10b981;
                        font-weight: bold;
                    }}
                    
                    .alert-box {{
                        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
                        border: 2px solid #ef4444;
                        border-radius: 12px;
                        padding: 20px 25px;
                        margin: 30px 0;
                        font-size: 15px;
                        color: #991b1b;
                        box-shadow: 0 4px 15px rgba(239, 68, 68, 0.15);
                    }}
                    
                    .alert-box strong {{
                        color: #7f1d1d;
                        font-weight: 700;
                    }}
                    
                    .divider {{
                        height: 2px;
                        background: linear-gradient(90deg, transparent, #e5e7eb, transparent);
                        margin: 35px 0;
                    }}
                    
                    .footer {{
                        background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
                        color: #e5e7eb;
                        padding: 40px 40px 35px;
                        text-align: center;
                        border-top: 3px solid #11998e;
                    }}
                    
                    .footer p {{
                        font-size: 14px;
                        margin: 0 0 12px 0;
                        color: #d1d5db;
                    }}
                    
                    .footer p:last-child {{
                        margin-bottom: 0;
                        color: #9ca3af;
                        font-size: 13px;
                    }}
                    
                    .footer-logo {{
                        font-size: 24px;
                        font-weight: 700;
                        margin-bottom: 15px;
                        background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                        background-clip: text;
                    }}
                    
                    @media (max-width: 600px) {{
                        .email-container {{
                            margin: 10px;
                            border-radius: 15px;
                        }}
                        
                        .success-header {{
                            padding: 35px 25px;
                        }}
                        
                        .success-header h1 {{
                            font-size: 26px;
                        }}
                        
                        .content {{
                            padding: 35px 25px;
                        }}
                        
                        .greeting {{
                            font-size: 19px;
                        }}
                        
                        .message {{
                            font-size: 15px;
                        }}
                        
                        .success-icon .checkmark {{
                            width: 80px;
                            height: 80px;
                            font-size: 40px;
                        }}
                        
                        .security-tips {{
                            padding: 20px;
                        }}
                        
                        .footer {{
                            padding: 30px 25px;
                        }}
                    }}
                </style>
            </head>
            <body>
                <div class='email-wrapper'>
                    <div class='email-container'>
                        <div class='success-header'>
                            <h1>{companyName}</h1>
                            <p>Password Successfully Changed</p>
                        </div>
            
                        <div class='content'>
                            <div class='greeting'>
                                Hello {userName},
                            </div>
                
                            <div class='success-icon'>
                                <div class='checkmark'>✓</div>
                            </div>
                
                            <div class='message'>
                                Great news! Your password has been successfully changed. Your {companyName} account is now secured with your new password.
                            </div>
                
                            <div class='info-box'>
                                <div class='message'>
                                    📅 Password changed on: <strong>{DateTime.Now:MMMM dd, yyyy 'at' h:mm tt}</strong>
                                </div>
                            </div>
                
                            <div class='security-tips'>
                                <h3>Security Best Practices</h3>
                                <ul>
                                    <li>Keep your password confidential and never share it with anyone</li>
                                    <li>Use a unique password that you don't use on other websites</li>
                                    <li>Consider using a password manager for enhanced security</li>
                                    <li>Enable two-factor authentication if available</li>
                                    <li>If you notice any suspicious activity, contact us immediately</li>
                                </ul>
                            </div>
                
                            <div class='divider'></div>
                
                            <div class='alert-box'>
                                <strong>⚠️ Important:</strong> If you did not change your password, please contact our support team immediately at support@{companyName.ToLower().Replace(" ", "")}.com
                            </div>
                        </div>
            
                        <div class='footer'>
                            <div class='footer-logo'>{companyName}</div>
                            <p>This is an automated message from {companyName}</p>
                            <p>Please do not reply to this email</p>
                            <p>&copy; {DateTime.Now.Year} {companyName}. All rights reserved.</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>";
        }
        
        public static string NewStaffPasswordEmail(string userName, string email, string temporaryPassword, string companyName = "Web Application")
        {
            return $@"
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Welcome to {companyName}</title>
                <style>
                    * {{
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }}
                    body {{
                        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                        line-height: 1.6;
                        color: #333;
                        background-color: #f4f4f4;
                    }}
                    .email-container {{
                        max-width: 600px;
                        margin: 20px auto;
                        background: #ffffff;
                        border-radius: 10px;
                        overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
                    }}
                    .welcome-header {{
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        padding: 40px 30px;
                        text-align: center;
                        color: white;
                    }}
                    .welcome-header h1 {{
                        font-size: 28px;
                        margin-bottom: 10px;
                        font-weight: 300;
                    }}
                    .content {{
                        padding: 40px 30px;
                    }}
                    .greeting {{
                        font-size: 18px;
                        margin-bottom: 20px;
                        color: #2c3e50;
                    }}
                    .message {{
                        font-size: 16px;
                        margin-bottom: 25px;
                        line-height: 1.8;
                        color: #555;
                    }}
                    .credentials {{
                        background: #f8f9fa;
                        border: 1px solid #e0e0e0;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 25px 0;
                        font-size: 15px;
                    }}
                    .credentials strong {{
                        color: #2563eb;
                    }}
                    .instructions {{
                        background: #e8f5e9;
                        border-left: 4px solid #16a34a;
                        padding: 20px;
                        border-radius: 5px;
                        margin-bottom: 25px;
                    }}
                    .instructions h3 {{
                        margin-bottom: 10px;
                        color: #15803d;
                        font-size: 16px;
                    }}
                    .instructions ul {{
                        margin-left: 20px;
                        color: #555;
                    }}
                    .instructions li {{
                        margin-bottom: 8px;
                        font-size: 14px;
                    }}
                    .footer {{
                        background: #1f2937;
                        color: #ecf0f1;
                        padding: 30px;
                        text-align: center;
                    }}
                    .footer p {{
                        font-size: 14px;
                        margin-bottom: 10px;
                    }}
                </style>
            </head>
            <body>
                <div class='email-container'>
                    <div class='welcome-header'>
                        <h1>Welcome to {companyName}!</h1>
                        <p>Your staff account has been created</p>
                    </div>

                    <div class='content'>
                        <div class='greeting'>
                            Hello {userName},
                        </div>

                        <div class='message'>
                            We’re excited to welcome you to the {companyName} team. Below are your login details to access your staff account:
                        </div>

                        <div class='credentials'>
                            <p><strong>Email:</strong> {email}</p>
                            <p><strong>Temporary Password:</strong> {temporaryPassword}</p>
                        </div>

                        <div class='instructions'>
                            <h3>Next Steps:</h3>
                            <ul>
                                <li>Log in to the staff portal using the credentials above</li>
                                <li>You will be prompted to change your password on first login</li>
                                <li>Keep your new password secure and do not share it</li>
                            </ul>
                        </div>

                        <div class='message'>
                            If you have any issues accessing your account, please contact our IT support team.
                        </div>
                    </div>

                    <div class='footer'>
                        <p>This is an automated message from {companyName}</p>
                        <p>Please do not reply to this email</p>
                        <p>&copy; {DateTime.Now.Year} {companyName}. All rights reserved.</p>
                    </div>
                </div>
            </body>
            </html>";
        }

    }
}
