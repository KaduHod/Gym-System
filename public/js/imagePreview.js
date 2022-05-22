const formPreviewImage   = document.forms[0]
const inputsPreview = formPreviewImage.getElementsByTagName('input')
const {imagem} = inputsPreview
const PreviewImage = document.getElementById('PreviewImage')


function readImage() {
    if (this.files && this.files[0]) {
        var file = new FileReader();
        file.onload = function(e) {
            PreviewImage.style.backgroundImage = `url('${e.target.result}')`;
            console.log(e.target.result)
        };       
        file.readAsDataURL(this.files[0]);
    }
}

imagem.addEventListener('change', readImage, false)