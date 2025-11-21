# fastapi-example-app

## Frontend

So I decided to use Vite for this project utilising TypeScript and the react compiler. I like to split the components, pages and utils apart to keep it clean. I also like to use an index.ts file so that imports come from one folder. React router is used for routing throughout the application.

If there was more state I would probably have used Zustand for global state management, but I didn't think that it needed it for such a small project. 

I also used DaisyUI and tailwind for components. The only issue with DaisyUI is that they don't give you the functionality in their components out of the box. I liked to show you some of the functionality I can use, however, so it was a perfect fit for this project. 

## FastAPI

I haven't done much programming with FastAPI, but I have done a small amount with Python. I utilised my skills from working with .NET webapis and Express applications. This helped me to get a grasp of the main concepts much quicker with models and schemas (I guess I align this with classes and DTOs in .NET) and similarities with EF Core. Given I had more time, I would have used some sort of Migration based apporach. However, I also believe it is quite small as a project so in effect didn't need it. 

If you go to an individual item page by clicking More... on a card item, you will see that it goes to what would be the page for that item. As you can see on the screen, I explain how it is out of scope with the rubric. I decided not to add it, but if I were to, I would have created another endpoint that was getUserById and then put that info on the page. I could also have utilised the .find method over the array and used that but it didn't feel like the right choice. Some extra checks for 404s would have to be done too!

## Testing

I decided to add some testing to both projects. This is bare bones and just to show working with pytest, vitest and React Testing Library. 

## Docker and docker compose

This is minimal, but I wanted to make it as easy as possible, and I am treating it like a dev environment. Given I had a production setting I would think about minimal images, hardened containers, and secret injection. I have utilised this in my work with Hashicorp Vault and some Kubernetes setup in other projects and I am happy to talk through some of the ways that I have achieved this. Either way, I would definitely have another approach. However, serving the frontend with nginx is the approach I would take into production. 

Any more questions, don't hesitate to bring it up!


