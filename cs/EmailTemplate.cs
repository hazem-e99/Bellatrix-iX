namespace Bellatrix.Shared
{
    public static class EmailTemplate
    {
        public static string EmailConfirmationBodyTemplate(string recipientName, string confirmationCode, string companyName = "Your App", int expiryMinutes = 15)
        {
            return $@"
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Email Confirmation</title>
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
                    .header {{
                        background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%);
                        padding: 40px 30px;
                        text-align: center;
                        color: white;
                    }}
                    .header h1 {{
                        font-size: 28px;
                        margin-bottom: 10px;
                        font-weight: 300;
                    }}
                    .header p {{
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
                    .code-container {{
                        text-align: center;
                        margin: 30px 0;
                        padding: 30px;
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        border-radius: 10px;
                        position: relative;
                        overflow: hidden;
                    }}
                    .code-container::before {{
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(255, 255, 255, 0.1) 10px,
                            rgba(255, 255, 255, 0.1) 20px
                        );
                        animation: shimmer 3s linear infinite;
                    }}
                    @keyframes shimmer {{
                        0% {{ transform: translateX(-100%) translateY(-100%); }}
                        100% {{ transform: translateX(100%) translateY(100%); }}
                    }}
                    .code-label {{
                        font-size: 14px;
                        color: white;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        opacity: 0.9;
                        position: relative;
                        z-index: 2;
                    }}
                    .confirmation-code {{
                        font-size: 36px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        color: white;
                        font-family: 'Courier New', monospace;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                        position: relative;
                        z-index: 2;
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
                    .instructions {{
                        background: #f8f9fa;
                        border-left: 4px solid #2563eb;
                        padding: 20px;
                        margin: 25px 0;
                        border-radius: 5px;
                    }}
                    .instructions h3 {{
                        color: #2563eb;
                        margin-bottom: 10px;
                        font-size: 16px;
                    }}
                    .instructions ol {{
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
                    .security-notice {{
                        background: #e8f4fd;
                        border: 1px solid #bee5eb;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 20px 0;
                        font-size: 13px;
                        color: #0c5460;
                    }}
                    .security-notice strong {{
                        color: #0a4249;
                    }}
                    @media (max-width: 600px) {{
                        .email-container {{
                            margin: 10px;
                            border-radius: 5px;
                        }}
                        .header {{
                            padding: 30px 20px;
                        }}
                        .content {{
                            padding: 30px 20px;
                        }}
                        .confirmation-code {{
                            font-size: 28px;
                            letter-spacing: 4px;
                        }}
                        .code-container {{
                            padding: 20px;
                        }}
                    }}
                </style>
            </head>
            <body>
                <div class='email-container'>
                    <div class='header'>
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
            
                        <div class='security-notice'>
                            <strong>🔒 Security Note:</strong> If you didn't request this verification code, please ignore this email. Your account remains secure and no action is required.
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
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Password Reset Code</title>
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
                    .header {{
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        padding: 40px 30px;
                        text-align: center;
                        color: white;
                    }}
                    .header h1 {{
                        font-size: 28px;
                        margin-bottom: 10px;
                        font-weight: 300;
                    }}
                    .header p {{
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
                    .code-container {{
                        text-align: center;
                        margin: 30px 0;
                        padding: 30px;
                        background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
                        border-radius: 10px;
                        position: relative;
                        overflow: hidden;
                    }}
                    .code-container::before {{
                        content: '';
                        position: absolute;
                        top: -50%;
                        left: -50%;
                        width: 200%;
                        height: 200%;
                        background: repeating-linear-gradient(
                            45deg,
                            transparent,
                            transparent 10px,
                            rgba(255, 255, 255, 0.1) 10px,
                            rgba(255, 255, 255, 0.1) 20px
                        );
                        animation: shimmer 3s linear infinite;
                    }}
                    @keyframes shimmer {{
                        0% {{ transform: translateX(-100%) translateY(-100%); }}
                        100% {{ transform: translateX(100%) translateY(100%); }}
                    }}
                    .code-label {{
                        font-size: 14px;
                        color: white;
                        margin-bottom: 10px;
                        text-transform: uppercase;
                        letter-spacing: 1px;
                        opacity: 0.9;
                        position: relative;
                        z-index: 2;
                    }}
                    .reset-code {{
                        font-size: 36px;
                        font-weight: bold;
                        letter-spacing: 8px;
                        color: white;
                        font-family: 'Courier New', monospace;
                        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
                        position: relative;
                        z-index: 2;
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
                        .header {{
                            padding: 30px 20px;
                        }}
                        .content {{
                            padding: 30px 20px;
                        }}
                        .reset-code {{
                            font-size: 28px;
                            letter-spacing: 4px;
                        }}
                        .code-container {{
                            padding: 20px;
                        }}
                    }}
                </style>
            </head>
            <body>
                <div class='email-container'>
                    <div class='header'>
                        <h1>{companyName}</h1>
                        <p>Password Reset Verification</p>
                    </div>

                    <div class='content'>
                        <div class='greeting'>
                            Hello {recipientName},
                        </div>

                        <div class='message'>
                            We received a request to reset your password. Please use the verification code below to proceed.
                        </div>

                        <div class='code-container'>
                            <div class='code-label'>Your Reset Code</div>
                            <div class='reset-code'>{resetCode}</div>
                        </div>

                        <div class='expiry-info'>
                            ⏱️ This code will expire in <strong>{expiryMinutes} minutes</strong> for your security.
                        </div>

                        <div class='security-notice'>
                            <strong>🔒 Security Notice:</strong> If you did not request a password reset, please ignore this email. 
                            Your account remains secure.
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

        public static string GetPasswordResetConfirmationEmailBody(string userName, string companyName = "Web Application")
        {
            return $@"
            <!DOCTYPE html>
            <html lang='en'>
            <head>
                <meta charset='UTF-8'>
                <meta name='viewport' content='width=device-width, initial-scale=1.0'>
                <title>Password Reset Confirmation</title>
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
                    .success-header {{
                        background: linear-gradient(135deg, #16a34a 0%, #15803d 100%);
                        padding: 40px 30px;
                        text-align: center;
                        color: white;
                    }}
                    .success-header h1 {{
                        font-size: 28px;
                        margin-bottom: 10px;
                        font-weight: 300;
                    }}
                    .success-header p {{
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
                    .success-icon {{
                        text-align: center;
                        margin: 30px 0;
                        padding: 20px;
                    }}
                    .success-icon .checkmark {{
                        font-size: 60px;
                        color: #16a34a;
                    }}
                    .security-tips {{
                        background: #e8f5e8;
                        border: 1px solid #c3e6c3;
                        border-radius: 8px;
                        padding: 20px;
                        margin: 25px 0;
                    }}
                    .security-tips h3 {{
                        color: #15803d;
                        margin-bottom: 15px;
                        font-size: 16px;
                    }}
                    .security-tips ul {{
                        margin-left: 20px;
                        color: #15803d;
                    }}
                    .security-tips li {{
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
                    @media (max-width: 600px) {{
                        .email-container {{
                            margin: 10px;
                            border-radius: 5px;
                        }}
                        .success-header {{
                            padding: 30px 20px;
                        }}
                        .content {{
                            padding: 30px 20px;
                        }}
                        .success-icon .checkmark {{
                            font-size: 45px;
                        }}
                    }}
                </style>
            </head>
            <body>
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
                            Your password has been successfully changed! Your {companyName} account is now secured with your new password.
                        </div>
            
                        <div class='message'>
                            Password changed on: <strong>{DateTime.Now:MMMM dd, yyyy 'at' h:mm tt}</strong>
                        </div>
            
                        <div class='security-tips'>
                            <h3>🔐 Security Tips:</h3>
                            <ul>
                                <li>Keep your password confidential and don't share it with anyone</li>
                                <li>Use a unique password that you don't use on other websites</li>
                                <li>Consider using a password manager for added security</li>
                                <li>If you notice any suspicious activity, contact us immediately</li>
                            </ul>
                        </div>
            
                        <div class='message'>
                            If you did not change your password, please contact our support team immediately at support@{companyName.ToLower()}.com
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
