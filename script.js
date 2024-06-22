async function uploadImage(file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
        reader.onload = async () => {
            const base64Image = reader.result.split(',')[1];
            const filename = file.name;

            try {
                const response = await fetch(`https://api.github.com/repos/Nidhi-Data-Analyst/Test1/actions/workflows/image-upload.yml/dispatches`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${GITHUB_TOKEN}`,  // This will be handled by the workflow
                        'Accept': 'application/vnd.github.v3+json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        ref: 'main',
                        inputs: {
                            image: base64Image,
                            filename: filename
                        }
                    })
                });

                if (response.ok) {
                    // Wait for the action to complete and the image to be available
                    setTimeout(() => {
                        resolve(`https://github.com/Nidhi-Data-Analyst/Test1/raw/main/images/${filename}`);
                    }, 10000); // 10 seconds delay
                } else {
                    reject(`Failed to trigger GitHub Action: ${errorMessage}`);
                }
            } catch (error) {
                reject(`Failed to upload image: ${error.message}`);
            }
        };

        reader.onerror = (error) => reject(error);
    });
}

async function uploadImageAndGenerateSignature() {
    const profilePic = document.getElementById('profilePic').files[0];
    if (!profilePic) {
        alert('Please upload a profile picture.');
        return;
    }

    try {
        const profilePicUrl = await uploadImage(profilePic);
        generateSignature(profilePicUrl);
    } catch (error) {
        console.error('Error uploading image:', error);
        alert(`Failed to upload image: ${error}`);
    }
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
    <div class="signature-container" style="font-family: Poppins, Arial, sans-serif; line-height: 1.5; color: #a6a6a6; border: 1px solid #e0e0e0; padding: 10px; border-radius: 5px; width: 100%; max-width: 600px;">
        <table>
            <tr>
                <td style="vertical-align: top; padding-right: 10px; display: flex; flex-direction: column; align-items: center;">
                    <img src="${profilePicUrl}" alt="Profile Picture" class="profile-pic" style="border-radius: 50%; width: 70px;">
                    <img src="${githubBaseUrl}school-logo.png?raw=true" alt="School Logo" class="school-logo" style="width: 60px; margin-top: 3px;">
                    <div class="school-locations" style="font-size: 5px; color: #0d56a2; text-align: center; margin-top: 3px;">
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
}

function copyToClipboard() {
    const signatureResult = document.getElementById('signature-result');
    const range = document.createRange();
    range.selectNode(signatureResult);
    window.getSelection().removeAllRanges(); 
    window.getSelection().addRange(range); 
    document.execCommand('copy');
    window.getSelection().removeAllRanges(); 
    alert('Signature copied to clipboard!');
}

function copyHtmlToSignatureRescue() {
    const signatureHtml = document.getElementById('signature-result').innerHTML;
    const blob = new Blob([signatureHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'signature.html';
    a.click();
}
