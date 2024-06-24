async function uploadImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
        reader.onload = async () => {
            const base64Image = reader.result.split(',')[1];
            const filename = file.name;
            const githubToken = document.getElementById('githubToken').value;

            try {
                const response = await fetch(`https://api.github.com/repos/Nidhi-Data-Analyst/Test1/dispatches`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${githubToken}`,
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        event_type: 'upload-image',
                        client_payload: {
                            filename: filename,
                            image: base64Image
                        }
                    })
                });

                if (response.ok) {
                    resolve(`images/${filename}`);
                } else {
                    const responseData = await response.json();
                    reject(`Failed to upload image: ${responseData.message}`);
                }
            } catch (error) {
                reject(`Failed to upload image: ${error.message}`);
            }
        };
    });
}
function uploadImageAndGenerateSignature() {
    const fileInput = document.getElementById('profilePic');
    const file = fileInput.files[0];

    uploadImage(file).then((profilePicUrl) => {
        generateSignature(profilePicUrl);
    }).catch(error => {
        alert(error);
    });
}

function generateSignature(profilePicUrl) {
    const name = document.getElementById('name').value;
    const designation = document.getElementById('designation').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const linkedin = document.getElementById('linkedin').value;
    const campus = document.getElementById('campus').value;

    if (!name || !designation || !phone || !email || !profilePicUrl || !campus) {
        alert('Please fill in all mandatory fields.');
        return;
    }

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
        <div class="vertical-line-small"></div>
        <a href="${linkedin}" target="_blank">
            <img src="${githubBaseUrl}linkedin-icon.png?raw=true" alt="LinkedIn" style="width: 15px; height: 15px;">
        </a>
        `;
    }

    const signatureHtml = `
    <div class="signature-container" style="font-family: Poppins, Arial, sans-serif; line-height: 1.5; color: #a6a6a6; border: 1px solid #e0e0e0; padding: 5px; border-radius: 5px; width: 100%; max-width: 340px;">
        <table>
            <tr>
                <td style="vertical-align: top; padding-right: 10px; display: flex; flex-direction: column; align-items: center;">
                    <img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic" style="border-radius: 50%; max-width:60px; width:100%">
                    <img src="${githubBaseUrl}school-logo.png?raw=true" alt="School Logo" class="school-logo" style="width:100%; max-width:60px; display:block; text-align:center;  margin-top: 3px;">
                    <div class="school-locations" style="font-size: 5px; color: #0d56a2; text-align: center; margin-top: 3px; width:100%; clear:both">
                        <span style="font-weight: ${bolds.Noida};">Noida</span> | 
                        <span style="font-weight: ${bolds.Gurgaon};">Gurgaon</span> | 
                        <span style="font-weight: ${bolds.Faridabad};">Faridabad</span> | 
                        <span style="font-weight: ${bolds.Delhi};">Delhi</span> | 
                        <span style="font-weight: ${bolds.Chennai};">Chennai</span>
                    </div>
                </td>
                <td style="border-left: 1.5px solid #e0e0e0; padding-left: 10px;">
                    <div class="name-linkedin" style="display: flex; align-items: center; font-weight: bold; color: #a6a6a6; font-size: 14px; margin-bottom: 1px;">
                        <span>${name}</span>
                        ${linkedinHtml}
                    </div>
                    <div class="designation" style="color: #a6a6a6; font-size: 12px; margin-top: 0px;">
                        ${designation}
                    </div>
                    <div class="contact-info" style="margin-top: 10px; font-size: 10px;">
                        <div>
                            <img src="${githubBaseUrl}phone-icon.png?raw=true" alt="Phone Icon" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                            ${phone}
                        </div>
                        <div>
                            <img src="${githubBaseUrl}email-icon.png?raw=true" alt="Email Icon" style="width: 16px; vertical-align: middle; margin-right: 5px;">
                            <a href="mailto:${email}" style="color: #a6a6a6; text-decoration: none;">${email}</a>
                        </div>
                        <div class="social-icons" style="margin-top: 5px;">
                            <a href="https://www.instagram.com" target="_blank">
                                <img src="${githubBaseUrl}instagram-icon.png?raw=true" alt="Instagram">
                            </a>
                            <a href="https://www.facebook.com" target="_blank">
                                <img src="${githubBaseUrl}facebook-icon.png?raw=true" alt="Facebook">
                            </a>
                            <a href="https://www.twitter.com" target="_blank">
                                <img src="${githubBaseUrl}twitter-icon.png?raw=true" alt="Twitter">
                            </a>
                            <a href="https://www.youtube.com" target="_blank">
                                <img src="${githubBaseUrl}youtube-icon.png?raw=true" alt="YouTube">
                            </a>
                            <a href="https://www.website.com" target="_blank">
                                <img src="${githubBaseUrl}website-icon.png?raw=true" alt="Website">
                            </a>
                        </div>
                    </div>
                </td>
            </tr>
        </table>
    </div>
    `;

    document.getElementById('signature-result').innerHTML = signatureHtml;
}

function copyToClipboard() {
    const signatureResult = document.getElementById('signature-result');
    if (!signatureResult) {
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
    if (!signatureResult) {
        alert('No signature to copy.');
        return;
    }

    const html = signatureResult.innerHTML;
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signature.html';
    a.click();
    URL.revokeObjectURL(url);
}

document.getElementById('generate-button').addEventListener('click', uploadImageAndGenerateSignature);
document.getElementById('copy-button').addEventListener('click', copyToClipboard);
document.getElementById('download-button').addEventListener('click', copyHtmlToSignatureRescue);
