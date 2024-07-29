console.log("JavaScript loaded successfully.");

function generateSignature() {
    console.log("Generating signature...");
    
    const name = document.getElementById('name').value.trim();
    const designation = document.getElementById('designation').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const email = document.getElementById('email').value.trim();
    const linkedin = document.getElementById('linkedin').value.trim();
    const profilePicUrlInput = document.getElementById('profilePicUrl').value.trim();
    const campus = document.getElementById('campus').value.trim();

    let errorMessage = "";

    if (!name) {
        errorMessage += "Name is required.\n";
    }
    if (!designation) {
        errorMessage += "Designation is required.\n";
    }
    if (!phone || !/^\d+$/.test(phone)) {
        errorMessage += "Valid phone number is required.\n";
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errorMessage += "Valid email address is required.\n";
    }
    if (!profilePicUrlInput || !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(profilePicUrlInput)) {
        errorMessage += "Valid profile picture URL is required.\n";
    }
    if (!campus) {
        errorMessage += "Campus is required.\n";
    }
    if (linkedin && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(linkedin)) {
        errorMessage += "Valid LinkedIn URL is required.\n";
    }

    if (errorMessage) {
        alert(errorMessage);
        return;
    }

    const fileIdMatch = profilePicUrlInput.match(/[-\w]{25,}/);
    if (!fileIdMatch) {
        alert('Invalid Google Drive URL for profile picture.');
        return;
    }
    const profilePicUrl = `https://drive.google.com/uc?export=view&id=${fileIdMatch[0]}`;
    console.log("Profile Pic URL:", profilePicUrl);  // Debugging line

    const githubBaseUrl = 'https://github.com/Nidhi-Data-Analyst/Test1/blob/main/';
    const schoolLogo ='https://raw.githubusercontent.com/Nidhi-Data-Analyst/Test1/3f61538f21dc0a1d67e03087c4919aa46a88c322/school-logo-svg.svg'

    const bolds = {
        "Noida": "normal",
        "Gurgaon": "normal",
        "Faridabad": "normal",
        "Delhi": "normal",
        "Chennai": "normal",
    };
    bolds[campus] = "bold";

    let linkedinHtml = '';
    if (linkedin) {
        linkedinHtml = `
            <div style="display: inline-block; width: 1px; background-color: #a6a6a6; background-color: rgb(166, 166, 166); height: 15px; margin: 1 1px;"></div>
            <a href="${linkedin}" target="_blank">
                <img src="${githubBaseUrl}Rlinkedin-icon.png?raw=true" alt="LinkedIn" style="height: 10px;">
            </a>
        `;
    }

    const signatureHtml = `
        <div style="font-family: Poppins, Arial, sans-serif; line-height: 1.5; color: #a6a6a6; border: 1px solid #e0e0e0; padding: 0px; border-radius: 5px; width: 100%; max-width: 340px;">
            <table cellpadding="0" cellspacing="0" border="0" style="width: 100%;">
                <tr>
                    <td style="vertical-align: top; padding-right: 10px; text-align: center;">
                        <img src="${profilePicUrl}" alt="Profile Picture" style="border-radius: 50%; max-width:70px; width:100%; text-align:center;">
                        <br>
                        <img src="${schoolLogo}" alt="School Logo" style="width:100%; max-width:70px; display: block; margin: 3px auto 0;">
                        <div class="school-locations" style="font-size: 5px; color: #0d56a2; text-align: center; margin-top: 1px;">
                            <span style="font-weight: ${bolds.Noida};">Noida</span> | 
                            <span style="font-weight: ${bolds.Gurgaon};">Gurgaon</span> | 
                            <span style="font-weight: ${bolds.Faridabad};">Faridabad</span> | 
                            <span style="font-weight: ${bolds.Delhi};">Delhi</span> | 
                            <span style="font-weight: ${bolds.Chennai};">Chennai</span>
                        </div>
                    </td>
                    <td style="border-left: 1.5px solid #a6a6a6; padding-left: 10px;">
                        <table cellpadding="0" cellspacing="0" border="0" style="font-size: 14px; color: #a6a6a6; border-collapse: collapse;">
                            <tr>
                                <td style="font-weight: bold; vertical-align: top; padding: 0;">${name}</td>
                                <td style="padding-left: 5px; vertical-align: top; padding: 0;">${linkedinHtml}</td>
                            </tr>
                        </table>
                        <div style="color: #a6a6a6; font-size: 12px; margin-top: 0px;">${designation}</div>
                        <div style="margin-top: 10px; font-size: 10px;">
                            <div style="margin-bottom: 2px;">
                                <img src="${githubBaseUrl}Rphone-icon.png?raw=true" alt="Phone Icon" style=" vertical-align: middle; margin-right: 5px;"> 
                                <a href="tel:${phone}" style="color: #a6a6a6; text-decoration: none;">${phone}</a>
                            </div>
                            <div style="margin-bottom: 2px;">
                                <img src="${githubBaseUrl}Remail-icon.png?raw=true" alt="Email Icon" style=" vertical-align: middle; margin-right: 5px;"> 
                                <a href="mailto:${email}" style="color: #a6a6a6; text-decoration: none;">${email}</a>
                            </div>
                            <div style="margin-bottom: 2px;">
                                <img src="${githubBaseUrl}Rwebsite-icon.png?raw=true" alt="Web Icon" style=" vertical-align: middle; margin-right: 5px;"> 
                                <a href="https://shivnadarschool.edu.in/" style="color: #a6a6a6; text-decoration: none;">https://shivnadarschool.edu.in/</a>
                            </div>
                        </div>
                        <div style="margin-top: 3px;">
                            <a href="https://www.facebook.com/shivnadarschool" style="margin-right: 5px;"><img src="${githubBaseUrl}Rfacebook-icon.png?raw=true" alt="Facebook" ></a>
                            <a href="https://www.instagram.com/shivnadarschool" style="margin-right: 5px;"><img src="${githubBaseUrl}Rinstagram-icon.png?raw=true" alt="Instagram" ></a>
                            <a href="https://www.youtube.com/@shivnadarschools" style="margin-right: 5px;"><img src="${githubBaseUrl}Ryoutube-icon.png?raw=true" alt="YouTube" ></a>
                            <a href="https://www.linkedin.com/school/shiv-nadar-school/" style="margin-right: 5px;"><img src="${githubBaseUrl}Rlinkedin-icon.png?raw=true" alt="LinkedIn" ></a>
                            <a href="https://www.twitter.com/shivnadarschool" style="margin-right: 5px;"><img src="${githubBaseUrl}Rtwitter-icon.png?raw=true" alt="Twitter" ></a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
    `;

    console.log("Generated signature HTML:", signatureHtml);
    document.getElementById('signature-result').innerHTML = signatureHtml;
}

document.getElementById('generate-button').addEventListener('click', generateSignature);

function copyToClipboard() {
    const signatureResult = document.getElementById('signature-result');
    if (!signatureResult.innerHTML.trim()) {
        alert('No signature to copy.');
        return;
    }

    const range = document.createRange();
    range.selectNode(signatureResult);
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);

    try {
        document.execCommand('copy');
        alert('Signature copied to clipboard.');
    } catch (err) {
        alert('Failed to copy signature.');
    }

    window.getSelection().removeAllRanges();
}

function copyHtmlToSignatureRescue() {
    const signatureResult = document.getElementById('signature-result');
    if (!signatureResult.innerHTML.trim()) {
        alert('No signature to copy.');
        return;
    }

    const html = signatureResult.innerHTML;
    const textarea = document.createElement('textarea');
    textarea.value = html;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        alert('HTML copied to clipboard.');
    } catch (err) {
        alert('Failed to copy HTML.');
    }
    document.body.removeChild(textarea);
}

document.getElementById('copy-button').addEventListener('click', copyToClipboard);
document.getElementById('copy-html-button').addEventListener('click', copyHtmlToSignatureRescue);
