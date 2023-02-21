# Staybnb

Welcome to Staybnb, a clone of Airbnb.

<h3 align='center'>
 <a target='_blank' href="https://davids-airbnb-clone.herokuapp.com">» Check out the live site here «</a>
</h3>


## Technologies used:

![](https://user-images.githubusercontent.com/94085979/187011760-2ab7d8fe-2020-40d8-84a1-3e463ae6718e.svg)
![](https://user-images.githubusercontent.com/94085979/187011810-b9378e1a-8d2d-49ea-8d3d-eb3e83447c13.svg)
![](https://user-images.githubusercontent.com/94085979/187011814-ffd57673-d860-42dc-833b-20c793553b00.svg)
![](https://img.shields.io/badge/-Sequelize-52B0E7?logo=sequelize&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-Express-black?logo=express&logoColor=white&style=for-the-badge)
![](https://user-images.githubusercontent.com/94085979/187011820-bbcedb49-f350-456d-8d11-14326b394b2c.svg)
![](https://user-images.githubusercontent.com/94085979/187011825-efa962b0-85f6-4ead-a408-835f449860e9.svg)
![](https://user-images.githubusercontent.com/94085979/187011832-f41fd6fb-9845-4e2b-8423-4c58848612a4.svg)
![](https://img.shields.io/badge/-Amazon%20S3-569A31?logo=amazon-s3&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-SQLite-003B57?logo=sqlite&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-NPM-CB3837?logo=npm&logoColor=white&style=for-the-badge)
![](https://img.shields.io/badge/-Git-F05032?logo=git&logoColor=white&style=for-the-badge)



## About the Project

[API Documentation](https://github.com/davidjettt/Airbnb-clone/wiki/API-Documentation)

[Database Schema](https://github.com/davidjettt/Airbnb-clone/raw/master/backend/airbnb-clone-db-schema-3.png)

[Features List](https://github.com/davidjettt/Airbnb-clone/wiki/Features-List)

[Redux State Shape](https://github.com/davidjettt/Airbnb-clone/wiki/Redux-State-Shape)

[Frontend Route](https://github.com/davidjettt/Airbnb-clone/wiki/Frontend-Routes)


## Challenges/Code Sample
```Javascript
function ImageRemoveBtn ({ spot, imgId, idx, images, previewImages, setImages, setPreviewImages, formType }) {
    const dispatch = useDispatch()

    # removes preview image when user is creating a spot
    const removeImg = () => {
        const imagesCopy = images.slice()
        const previewImagesCopy = previewImages.slice()
        previewImagesCopy.splice(idx, 1)
        imagesCopy.splice(idx, 1)

        setPreviewImages(previewImagesCopy)
        setImages(imagesCopy)
    }

    # removes preview image and deletes image when user is editing a spot
    const removeImgEditSpot = async () => {
        const data = await dispatch(deleteSpotImageThunk(imgId, spot))
        const imagesObj = []

        data.Images?.forEach(img => {
            imagesObj.push(img.url)
        })

        setPreviewImages(imagesObj)
    }

    return (
        <img className='image-x-btn' src={xBtn} onClick={formType === 'Create a Spot' ? removeImg : removeImgEditSpot}  alt='' />
    )
}
```
When users are filling out the form to create a spot, they can upload images that is also displayed as a preview before the user submits their form. Each image has an 'X' on it, so users are able to remove an image.

To achieve this functionality, what I decided to do was store the preview images in an array and each preview image gets mapped out with this ImageRemoveBtn component with the unique identifier being the index. Once the 'X' button gets clicked the removeImg function will get triggered and a splice would be performed on the idx of the targeted preview image. Then setPreviewImages gets called to update state.

However, the removeImg function would not work if a user wanted to edit the images of a spot since removing a preview image would not delete the image from the database. So I decided to create another function, removeImgEditSpot, that gets triggered when a user is on the page for editing a spot. What this function is doing is calling an API to delete the targeted image and the data sent back is the rest of the images. So I extracted the image URLs, push them into an array, and updated state with that array.

I am proud of this code snippet because I had to really think outside of the box and utilize my debugging abilities and knowledge of React/Redux and how data flows in order to overcome this obstacle. Also, I think this component turned out pretty concise.


## App Screenshots

### Home Page
![](app-screenshots/staybnb-homepage.png)

### Spot Details Page
![](app-screenshots/staybnb-spot-page.png)

### Trips Page
![](app-screenshots/staybnb-trips-page.png)

<!-- ## How to Launch Project

To launch project locally:
- `cd` into the backend folder.
- Create a `.env` file with environment variables:
    ```
    PORT=8000
    DB_FILE=db/dev.db
    JWT_SECRET=INSERT-PASSWORD-HERE
    JWT_EXPIRES_IN=604800
    ```
- Run `npm install` to install dependencies and then `npm start` to start the server.
- On a separate terminal, `cd` into the frontend folder.
- Run `npm install` and then `npm start` to launch application onto the browser at http://localhost:3000 -->
