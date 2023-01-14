const fileUploader = document.querySelector('#file-uploader');
const upload=document.querySelector("#upload")
const text=document.querySelector("#text")
const urls="http://127.0.0.1:3000";
fileUploader.addEventListener('change', ()=>{
    console.log(fileUploader.files[0])
})
upload.addEventListener('click', async () => {
    
    // add formData
    const formData = new FormData();
    formData.append('image', fileUploader.files[0]);
    formData.append('text', text.value);
    console.log(text.value);
    // send to server
    const response = await fetch(`${urls}/images`, {
        method: 'POST',
        body: formData
    })
    const data = await response.json();
    if(data.data){
        location.reload();
    }
});

async function fetchAPI(){
    const response=await fetch(`${urls}/images`);
    const data=await response.json();
    if(data){
        console.log(data)
        const box=document.querySelector("#box");
        let d=data.data;
        for(let i=0; i<d.length; i++){
            const img=document.createElement('img');
            const div=document.createElement('div');
            const hr=document.createElement('hr');
            img.setAttribute('src', d[i])
            div.append(img, hr)
            box.appendChild(div)
        }
    }
};
fetchAPI();