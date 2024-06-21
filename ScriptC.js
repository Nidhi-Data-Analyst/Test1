function generateSignature() {
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const profilePic = document.getElementById('profilePic').files[0];
    const campus = document.getElementById('campus').value;

    if (!name || !designation || !phone || !email || !profilePic || !campus) {
        alert('Please fill in all mandatory fields.');
        return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(profilePic);
    reader.onloadend = function () {
        const profilePicUrl = reader.result;
        const githubBaseUrl = 'https://github.com/Nidhi-Data-Analyst/Email-Signature/blob/main/';

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
            <a href="${linkedin}" target="_blank">
                <img src="${githubBaseUrl}linkedin-icon.png?raw=true" alt="LinkedIn" style="width: 15px; height: 15px; margin-left: 5px;">
            </a>
            `;
        }

        const signatureHtml = `
        <div class="signature-container" style="font-family: Poppins, Arial, sans-serif; line-height: 1.5; color: #a6a6a6; border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; width: 100%; max-width: 600px;">
            <table>
                <tr>
                    <td style="vertical-align: top; padding-right: 10px;">
                        <img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic" style="border-radius: 50%; width: 70px;">
                        <img src="${githubBaseUrl}school-logo.png?raw=true" alt="School Logo" class="school-logo" style="width: 60px; margin-top: 10px;">
                        <div class="school-locations" style="font-size: 12px; color: #0d56a2; text-align: center; margin-top: 3px;">
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
                            <a href="https://www.facebook.com/shivnadarschool" style="margin-right: 10px;"><img src="${githubBaseUrl}facebook-icon.png?raw=true" alt="Facebook" style="width: 15px;"></a>
                            <a href="https://www.instagram.com/shivnadarschool" style="margin-right: 10px;"><img src="${githubBaseUrl}instagram-icon.png?raw=true" alt="Instagram" style="width: 15px;"></a>
                            <a href="https://www.youtube.com/@shivnadarschools" style="margin-right: 10px;"><img src="${githubBaseUrl}youtube-icon.png?raw=true" alt="YouTube" style="width: 15px;"></a>
                            <a href="https://www.linkedin.com/school/shiv-nadar-school/" style="margin-right: 10px;"><img src="${githubBaseUrl}linkedin-icon.png?raw=true" alt="LinkedIn" style="width: 15px;"></a>
                            <a href="https://www.twitter.com/shivnadarschool" style="margin-right: 10px;"><img src="${githubBaseUrl}twitter-icon.png?raw=true" alt="Twitter" style="width: 15px;"></a>
                        </div>
                    </td>
                </tr>
            </table>
        </div>
        `;
        document.getElementById('signature-result').innerHTML = signatureHtml;
    };
}

function copyToClipboard() {
    const signatureResult = document.getElementById('signature-result');
    const range = document.createRange();
    range.selectNode(signatureResult);
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand('copy');
    window.getSelection().removeAllRanges(); // to deselect
    alert('Signature copied to clipboard. You can now paste it into your Gmail signature settings.');
}

function copyToSignatureRescue() {
    const signatureHtml = document.getElementById('signature-result').innerHTML;
    const tempTextarea = document.createElement('textarea');
    tempTextarea.value = signatureHtml;
    document.body.appendChild(tempTextarea);
    tempTextarea.select();
    document.execCommand('copy');
    document.body.removeChild(tempTextarea);
    alert('HTML copied to clipboard for Signature Rescue.');
}
