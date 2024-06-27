function generateSignature() {
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

    const githubBaseUrl = 'https://github.com/Nidhi-Data-Analyst/Test1/blob/main/';

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
        <div class="vertical-line-small" style="display: inline-block; width: 1px; background-color: #a6a6a6; height: 15px; margin: 0 1px;"></div>
        <a href="${linkedin}" target="_blank">
            <img src="${githubBaseUrl}linkedin-icon.png?raw=true" alt="LinkedIn" style="width: 15px; height: 15px;">
        </a>
        `;
    }

    const signatureHtml = `
    <div class="signature-container" style="font-family: Poppins, Arial, sans-serif; line-height: 1.5; color: #a6a6a6; border: 1px solid #e0e0e0; padding: 5px; border-radius: 5px; width: 100%; max-width: 340px;">
        <table>
            <tr>
                <td style="vertical-align: top; padding-right: 10px; text-align: center;">
                    <img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic" style="border-radius: 50%; max-width:70px; width:100%;">
                    <img src="${githubBaseUrl}school-logo.png?raw=true" alt="School Logo" class="school-logo" style="width:100%; max-width:70px; display: block; margin-top: 3px; margin: 0 auto;">
                    <div class="school-locations" style="font-size: 5px; color: #0d56a2; text-align: center; margin-top: 5px; clear: both;">
                        <span style="font-weight: ${bolds.Noida};">Noida</span> | 
                        <span style="font-weight: ${bolds.Gurgaon};">Gurgaon</span> | 
                        <span style="font-weight: ${bolds.Faridabad};">Faridabad</span> | 
                        <span style="font-weight: ${bolds.Delhi};">Delhi</span> | 
                        <span style="font-weight: ${bolds.Chennai};">Chennai</span>
                    </div>
                </td>
                <td style="border-left: 1.5px solid #a6a6a6; padding-left: 10px;">
                    <div class="name-linkedin" style="font-weight: bold; color: #a6a6a6; font-size: 14px; margin-bottom: 1px;">
                        <span>${name}</span>
                        ${linkedinHtml}
                    </div>
                    <div class="designation" style="color: #a6a6a6; font-size: 12px; margin-top: 0px;">${designation}</div>
                    <div class="contact-info" style="margin-top: 10px; font-size: 10px;">
                        <div style="margin-bottom: 2px;">
                            <img src="${githubBaseUrl}phone-icon.png?raw=true" alt="Phone Icon" style="width: 16px; vertical-align: middle; margin-right: 5px;"> 
                            <a href="tel:${phone}" style="color: #a6a6a6; text-decoration: none;">${phone}</a>
                        </div>
                        <div style="margin-bottom: 2px;">
                            <img src="${githubBaseUrl}email-icon.png?raw=true" alt="Email Icon" style="width: 16px; vertical-align: middle; margin-right: 5px;"> 
                            <a href="mailto:${email}" style="color: #a6a6a6; text-decoration: none;">${email}</a>
                        </div>
                        <div style="margin-bottom: 2px;">
                            <img src="${githubBaseUrl}website-icon.png?raw=true" alt="Web Icon" style="width: 16px; vertical-align: middle; margin-right: 5px;"> 
                            <a href="https://shivnadarschool.edu.in/" style="color: #a6a6a6; text-decoration: none;">https://shivnadarschool.edu.in/</a>
                        </div>
                    </div>
                    <div class="social-icons" style="margin-top: 3px;">
                        <a href="https://www.facebook.com/shivnadarschool" style="margin-right: 5px;"><img src="${githubBaseUrl}facebook-icon.png?raw=true" alt="Facebook" style="width: 15px;"></a>
                        <a href="https://www.instagram.com/shivnadarschool" style="margin-right: 5px;"><img src="${githubBaseUrl}instagram-icon.png?raw=true" alt="Instagram" style="width: 15px;"></a>
                        <a href="https://www.youtube.com/@shivnadarschools" style="margin-right: 5px;"><img src="${githubBaseUrl}youtube-icon.png?raw=true" alt="YouTube" style="width: 15px;"></a>
                        <a href="https://www.linkedin.com/school/shiv-nadar-school/" style="margin-right: 5px;"><img src="${githubBaseUrl}linkedin-icon.png?raw=true" alt="LinkedIn" style="width: 15px;"></a>
                        <a href="https://www.twitter.com/shivnadarschool" style="margin-right: 5px;"><img src="${githubBaseUrl}twitter-icon.png?raw=true" alt="Twitter" style="width: 15px;"></a>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    `;

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
