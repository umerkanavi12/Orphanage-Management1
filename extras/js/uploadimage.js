    const infile = document.getElementById("imagefile");
    const choose_label = document.getElementById("choose-image-label");
    const previewcontainer = document.getElementById("image-preview");
    const previewimage = previewcontainer.querySelector(".image-preview_image");
    const previewtext = previewcontainer.querySelector(".default_text");
    const icon = document.getElementById("upload-icon");

    infile.addEventListener("change" , function(){
        const file = this.files[0];
        if(file){
            const reader = new FileReader();

            previewimage.style.display = "block";
            previewtext.style.display = "none";
            icon.style.display = 'none';
            console.log((file.name));
            choose_label.textContent = file.name;

            reader.addEventListener("load" , function () {
                
                previewimage.setAttribute("src" , this.result);               
            });

            reader.readAsDataURL(file);
        }else{
            previewimage.style.display = null;
            previewtext.style.display = null;
            previewimage.setAttribute("src" , ""); 
        }
    })

