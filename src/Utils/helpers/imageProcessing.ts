import { deleteObject, getDownloadURL, listAll, ref, uploadString } from 'firebase/storage';
import { storageBucket } from './firebase';

export const getImageBase64 = (file:Blob):Promise<string> => new Promise((resolve)=>{
  const reader = new FileReader();
  const img = new Image();

  reader.onload = () => {
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.hidden = true;

      const ctx = canvas.getContext('2d');

      if(!ctx) return;

      const size = Math.min(img.height, img.width);

      canvas.height = size;
      canvas.width = size;

      ctx.fillStyle = "#fff";
      ctx.fillRect(0,0, size, size);

      // Calculate position to center the image
      const xOffset = (size - img.width) / 2;
      const yOffset = (size - img.height) / 2;

      ctx.drawImage(img, xOffset, yOffset);

      return resolve(canvas.toDataURL("image/png"));

    }

    img.src = reader.result as string;
  }

  reader.readAsDataURL(file);

});


export const uploadImageToFireStorage = (base64:string, i:number) => {
  const num = (i + 1).toString().padStart(3, "0");
  const imgRef = ref(storageBucket,`public/Image${num}.png`);

  getDownloadURL(imgRef).then(() => {
    deleteObject(imgRef).then(()=>{
      uploadString(imgRef,base64,'base64').then((snap)=>{
        console.log('snap',snap);
      }).catch(e=>console.log('uploadErr',e))
    }).catch((e)=>console.log('deleteErr',e))
  }).catch(()=>{
    uploadString(imgRef,base64,'base64').then((snap)=>{
      console.log('snap',snap);
    }).catch(e=>console.log('uploadErr',e))
  })

}

export const getAllImages:Promise<string[]> = new Promise((resolve)=>{
  const tempArr:string[] = [];
  listAll(ref(storageBucket,'public')).then(async(images)=>{
    for (const img of images.items) {
      
      const index:number = parseInt(img.name.replace('Image','').replace('.png',''));
      
      await getDownloadURL(img).then((url)=>{
        tempArr[index] = url;
      })
      
    }
    return resolve(tempArr)
  })
})
