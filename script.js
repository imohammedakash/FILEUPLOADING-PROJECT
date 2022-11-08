const uploadBox = document.querySelector(".upload-box"),
    uploadImg = uploadBox.querySelector('img'),
    FileInput = uploadBox.querySelector('input'),
    ImgWidth = document.querySelector('#width'),
    ImgHeight = document.querySelector('#height'),
    ratioInput = document.querySelector('#lock-aspect-ratio'),
    downloadBtn = document.querySelector('#download-btn');

let ogImage;
const loadFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    uploadImg.src = URL.createObjectURL(file);
    uploadImg.addEventListener("load", () => {
        ImgWidth.value = uploadImg.naturalWidth;
        ImgHeight.value = uploadImg.naturalHeight;
        ogImage = uploadImg.naturalWidth / uploadImg.naturalHeight;
    })
}


ratioInput.addEventListener('keyup', () => {
    let height = ratioInput.checked ? ImgWidth.value / ogImage : ImgHeight.value;
    ImgHeight.value=height;
});
const download=()=>{
    const canvas=document.createElement('canvas');
    ctx=canvas.getContext('2d');
    const a=document.createElement('a');
    canvas.height=ImgHeight.value;
    canvas.width=ImgWidth.value;
    ctx.drawImage(uploadImg,0,0,canvas.height,canvas.width);
    a.href=canvas.toDataURL("image/jpg");
    a.download=new Date().getTime();
    a.click();
}
downloadBtn.addEventListener("click",download)
FileInput.addEventListener('change', loadFile);
uploadBox.addEventListener('click', () => {
    FileInput.click();
});
