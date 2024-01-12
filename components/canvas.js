import React, { useRef, useEffect, useState } from "react";

//const mouths = ["/mouth1.png", "/mouth2.png", "/mouth3.png"];
const cloths = [
  "/ordicats/cloths/1.png",
  "/ordicats/cloths/2.png",
  "/ordicats/cloths/3.png",
  "/ordicats/cloths/4.png",
  "/ordicats/cloths/5.png",
  "/ordicats/cloths/6.png",
  "/ordicats/cloths/7.png",
  "/ordicats/cloths/8.png",
  "/ordicats/cloths/9.png",
  "/ordicats/cloths/10.png",
  "/ordicats/cloths/11.png",
  "/ordicats/cloths/12.png",
  "/ordicats/cloths/13.png",
  "/ordicats/cloths/14.png",
  "/ordicats/cloths/15.png",
];
const eyes = [
  "/ordicats/eyes/1.png",
  "/ordicats/eyes/2.png",
  "/ordicats/eyes/3.png",
  "/ordicats/eyes/4.png",
  "/ordicats/eyes/5.png",
  "/ordicats/eyes/6.png",
  "/ordicats/eyes/7.png",
  "/ordicats/eyes/8.png",
  "/ordicats/eyes/9.png",
  "/ordicats/eyes/10.png",
  "/ordicats/eyes/11.png",
  "/ordicats/eyes/12.png",
  "/ordicats/eyes/13.png",
  "/ordicats/eyes/14.png",
  "/ordicats/eyes/15.png",
];
const hats = [
  "/empty.png",
  "/ordicats/hats/1.png",
  "/ordicats/hats/2.png",
  "/ordicats/hats/3.png",
  "/ordicats/hats/4.png",
  "/ordicats/hats/5.png",
  "/ordicats/hats/6.png",
  "/ordicats/hats/7.png",
  "/ordicats/hats/8.png",
  "/ordicats/hats/9.png",
  "/ordicats/hats/10.png",
  "/ordicats/hats/11.png",
  "/ordicats/hats/12.png",
  "/ordicats/hats/13.png",
  "/ordicats/hats/14.png",
  "/ordicats/hats/15.png",
  "/ordicats/hats/16.png",
];
const mouths = [
  "/ordicats/mouths/1.png",
  "/ordicats/mouths/2.png",
  "/ordicats/mouths/3.png",
  "/ordicats/mouths/4.png",
  "/ordicats/mouths/5.png",
  "/ordicats/mouths/6.png",
  "/ordicats/mouths/7.png",
  "/ordicats/mouths/8.png",
  "/ordicats/mouths/9.png",
];

const specials = [
  "/empty.png",
  "/ordicats/special/1.png",
  "/ordicats/special/2.png",
  "/ordicats/special/3.png",
];

const Canvas = (props) => {
  const [mouth, setMouth] = useState(mouths[0]);
  const [eye, setEye] = useState(eyes[0]);
  const [hat, setHat] = useState(hats[0]);
  const [special, setSpecial] = useState(specials[0]);
  const [cloth, setCloth] = useState(cloths[0]);
  const [backgroundColor, setBackgroundColor] = useState("transparent");
  const [name, setName] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  /**
   * Promisify loading an image
   * @param {String} imagePath The web location of the image
   * @returns {Promise} A Promise that will resolve to an Image
   */
  function loadImage(imagePath) {
    return new Promise((resolve, reject) => {
      let image = new Image();
      image.addEventListener("load", () => {
        resolve(image);
      });
      image.addEventListener("error", (err) => {
        reject(err);
      });
      image.src = imagePath;
    });
  }

  /* REGISTER DOWNLOAD HANDLER */
  /* Only convert the canvas to Data URL when the user clicks. 
   This saves RAM and CPU ressources in case this feature is not required. */
  async function dlCanvas() {
    // var c = document.getElementById("myCanvas");

    // var dt = c.toDataURL("image/png");

    // var newTab = window.open("about:blank", "image from canvas");
    // newTab.document.write("<img src='" + dt + "' alt='from canvas'/>");

    // /* Change MIME type to trick the browser to downlaod the file instead of displaying it */
    // dt = dt.replace(/^data:image\/[^;]*/, "data:application/octet-stream");

    // /* In addition to <a>'s "download" attribute, you can define HTTP-style headers */
    // dt = dt.replace(
    //   /^data:application\/octet-stream/,
    //   "data:application/octet-stream;headers=Content-Disposition%3A%20attachment%3B%20filename=Canvas.png"
    // );

    var c = document.getElementById("myCanvas");
    var dt = c.toDataURL("image/png");

    // Create a hidden anchor element
    var a = document.createElement("a");
    a.style.display = "none";

    // Set the download attribute and href
    a.download = "Canvas.png";
    a.href = dt.replace(/^data:image\/[^;]*/, "data:application/octet-stream");

    // Append the anchor element to the document
    document.body.appendChild(a);

    // Simulate a click on the anchor element
    a.click();

    // Remove the anchor element from the document
    document.body.removeChild(a);

    const file = dataURLtoFile(dt, "mfercat.png");

    // try {
    //   const added = await client.add(file, {
    //     progress: (prog) => console.log(`received: ${prog}`),
    //   });
    //   const url = `https://ipfs.infura.io/ipfs/${added.path}`;
    //   setFileUrl(url);
    //   console.log(url);
    //   const description = "Mfer Catz are sick.";

    //   const data = JSON.stringify({
    //     name,
    //     description,
    //     image: url,
    //     attributes: [
    //       {
    //         trait_type: "Background",
    //         value: backgroundColor,
    //       },
    //       {
    //         trait_type: "Eyes",
    //         value: eye,
    //       },
    //     ],
    //   });
    //   try {
    //     const added = await client.add(data);
    //     const metaUrl = `https://ipfs.infura.io/ipfs/${added.path}`;
    //     /* after file is uploaded to IPFS, pass the URL to save it on Polygon */
    //     console.log(metaUrl);
    //     await mint(metaUrl);
    //   } catch (error) {
    //     console.log("Error uploading metadata: ", error);
    //   }
    // } catch (error) {
    //   console.log("Error uploading image: ", error);
    // }

    //console.log(dt);
  }

  async function mint(url) {
    // const web3Modal = new Web3Modal();
    // const connection = await web3Modal.connect();
    // console.log(connection);
    // const provider = new ethers.providers.Web3Provider(connection);

    //const account = await connectToMetaMask();

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    const signer = provider.getSigner();

    var overrideOptions = {
      //gasLimit: 2500000,
      //gasPrice: gasPrice,
      nonce: 0,
    };

    /* next, create the item */
    let contract = new ethers.Contract(nftaddress, NFT.abi, signer);
    let transaction = await contract.createToken(url);
    let tx = await transaction.wait();
    let event = tx.events[0];
    let value = event.args[2];
    let tokenId = value.toNumber();
    const price = ethers.utils.parseUnits(formInput.price, "ether");

    // /* then list the item for sale on the marketplace */
    // contract = new ethers.Contract(nftmarketaddress, Market.abi, signer);
    // let listingPrice = await contract.getListingPrice();
    // listingPrice = listingPrice.toString();

    // transaction = await contract.createMarketItem(nftaddress, tokenId, price, {
    //   value: listingPrice,
    // });
    // await transaction.wait();
    //router.push("/");
  }

  function nextMouthHandler() {
    let index = mouths.indexOf(mouth);

    if (index !== mouths.length - 1) {
      setMouth(mouths[index + 1]);
    } else {
      setMouth(mouths[0]);
    }
  }

  function nextEyesHandler() {
    let index = eyes.indexOf(eye);

    if (index !== eyes.length - 1) {
      setEye(eyes[index + 1]);
    } else {
      setEye(eyes[0]);
    }
  }

  function nextClothHandler() {
    let index = cloths.indexOf(cloth);

    if (index !== cloths.length - 1) {
      setCloth(cloths[index + 1]);
    } else {
      setCloth(cloths[0]);
    }
  }

  function nextHatHandler() {
    let index = hats.indexOf(hat);

    if (index !== hats.length - 1) {
      setHat(hats[index + 1]);
    } else {
      setHat(hats[0]);
    }
  }

  function nextSpecialHandler() {
    let index = specials.indexOf(special);

    if (index !== specials.length - 1) {
      setSpecial(specials[index + 1]);
    } else {
      setSpecial(specials[0]);
    }
  }

  useEffect(() => {
    var c = document.getElementById("myCanvas");
    var ctx = c.getContext("2d");
    ctx.clearRect(0, 0, c.width, c.height);

    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, c.width, c.height);

    var img1 = new Image();
    img1.src = cloth;

    var img2 = new Image();
    img2.src = "/head.png";

    var img3 = new Image();
    img3.src = "/hair.png";

    var img4 = new Image();
    img4.src = eye;

    var img5 = new Image();
    img5.src = mouth;

    var img6 = new Image();
    img6.src = hat;

    var img7 = new Image();
    img7.src = special;

    const allImages = [
      cloth,
      "/head.png",
      "/hair.png",
      special,
      mouth,
      eye,
      hat,
    ];

    Promise.all(allImages.map((i) => loadImage(i)))
      .then((images) => {
        images.forEach((image) => {
          ctx.drawImage(image, 0, 0);
        });
      })
      .catch((err) => {
        console.error(err);
      });

    // ctx.drawImage(img1, 0, 0);
    // ctx.drawImage(img2, 0, 0);
    // ctx.drawImage(img3, 0, 0);
    // ctx.drawImage(img4, 0, 0);
    // ctx.drawImage(img5, 0, 0);
    // ctx.drawImage(img1, 0, 0);

    // img1.onload = function () {
    //   //draw background image
    //   ctx.drawImage(img1, 0, 0);
    //   //draw a box over the top
    // };

    // img2.onload = function () {
    //   //draw background image
    //   ctx.drawImage(img2, 0, 0);
    //   //draw a box over the top
    // };

    // img3.onload = function () {
    //   //draw background image
    //   ctx.drawImage(img3, 0, 0);
    //   //draw a box over the top
    // };

    // img4.onload = function () {
    //   //draw background image
    //   ctx.drawImage(img4, 0, 0);
    //   //draw a box over the top
    // };

    // img5.onload = function () {
    //   //draw background image
    //   ctx.drawImage(img5, 0, 0);
    //   //draw a box over the top
    // };
    //ctx.drawImage(img3, 0, 0);
  }, [mouth, cloth, eye, hat, special, backgroundColor]);

  return (
    <div className="">
      <div className="grid grid-cols-1 h-full sm:grid-cols-2">
        <div className="flex items-center justify-center p-4 border-double border-[6px] border-orange-300">
          <canvas
            id="myCanvas"
            width="2048"
            height="2048"
            className="max-w-full"
          >
            Your browser does not support the HTML canvas tag.
          </canvas>
        </div>
        <div className="p-4 border-double border-[6px] border-orange-300">
          <div className="control text-white">
            <div>
              <input
                type="text"
                placeholder="Name"
                className="input px-4 py-2 w-full"
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div className="flex">
              <div className="mr-6">
                <span>Mouth</span>

                <div>
                  <button onClick={nextMouthHandler}>←</button>
                  <button onClick={nextMouthHandler}>→</button>
                </div>
              </div>
              <div>
                <span>Hat</span>

                <div>
                  <button onClick={nextHatHandler}>←</button>
                  <button onClick={nextHatHandler}>→</button>
                </div>
              </div>
            </div>
            <div className="flex">
              <div className="mr-6">
                <span>Clothes</span>

                <div>
                  <button onClick={nextClothHandler}>←</button>
                  <button onClick={nextClothHandler}>→</button>
                </div>
              </div>
              <div>
                <span>Eyes</span>

                <div>
                  <button onClick={nextEyesHandler}>←</button>
                  <button onClick={nextEyesHandler}>→</button>
                </div>
              </div>
            </div>

            <div>
              <span>Special</span>

              <div>
                <button onClick={nextSpecialHandler}>←</button>
                <button onClick={nextSpecialHandler}>→</button>
              </div>
            </div>
            <div>
              <span>Background</span>
              <input
                type="color"
                id="favcolor"
                name="favcolor"
                className="block rounded-lg border border-gray-50"
                onChange={(event) => setBackgroundColor(event.target.value)}
              />
            </div>
          </div>
          <div className="mt-10">
            <button onClick={dlCanvas} className="btn w-full px-4 py-2">
              Inscribe
            </button>
          </div>
        </div>
      </div>
      <div>
        {/*<a id="dl" download="Canvas.png" href="#" onClick={dlCanvas}>
          Download Canvas
        </a>

  <button onClick={dlCanvas}>DL</button>*/}
      </div>
    </div>
  );
};

export default Canvas;
