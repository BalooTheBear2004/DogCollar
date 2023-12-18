// const { use } = require("matter");

index = 0; 
// window.onload = () => {
//   //localStorage.clear();
//   if (UsersList != null) {
//     GetUsersFromFB();
//   } else {
//     UsersList = [];
//   }
  
//   // Initialize the LoggedUser object
//   GetLoggedInUser().then(() => {
//     if (LoggedUser != null) {
//       index = LoggedUser.id;
//       console.log(LoggedUser.username);
//       ul = document.getElementById("IsLogged");
//       ul.innerHTML = `
//         <div class="profile-card">
//           <center>
//             <img class="profile-picture" src="https://loremflickr.com/200/200/Capybara/all?random=1" alt="User Picture">
//             <div class="user-name">${LoggedUser.username}</div>
//           </center>
//         </div>
//       `;
//       console.log(LoggedUser);
//     }
//   });

//   // Rest of your code
// };


  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyB-EFyJEBacTqmGtUyuuZXQpdZ9zb0VySU",
    authDomain: "test-c8976.firebaseapp.com",
    databaseURL: "https://test-c8976-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-c8976",
    storageBucket: "test-c8976.appspot.com",
    messagingSenderId: "1016612230634",
    appId: "1:1016612230634:web:b5dc97d100e18b4febce93"
  };
  // Initialize Firebase
  const app = firebase.initializeApp(firebaseConfig);

  currentUser = {}
  window.addEventListener("load", ()=>{
    if (window.location.pathname === '/AddAnimal.html') {
        ShowAnimals();
    }

    showUser()
    console.log(currentUser)
  })

  function showUser(){
    currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
    if (currentPathname === '/index.html') {document.getElementById("loading").style.display = 'none';}
    
    var starCountRef = firebase.database().ref('users/'+currentUser.uid+'/username');
    starCountRef.once('value', (snapshot) => {
      username = snapshot.val();
      if(username != null){
        if (currentPathname === '/index.html') {
          document.getElementById("loading").style.display = 'block';
          document.getElementById("LoginButton").style.display = 'none';
        document.getElementById("login-container").style.display = 'none';
        document.getElementById("all-title").style.display = 'none';
        document.getElementById("description-container").style.display = 'none';
        document.getElementById("state-container").style.display = 'none';
        document.getElementById("all-container").style.display = 'none';
        }
        document.getElementById("AddAnimalMenu").style.display = 'flex';
        document.getElementById("logout-container").style.display = 'block';
        ul = document.getElementById("IsLogged");
      ul.innerHTML = `
        <div class="profile-card">
          <center>
            <img class="profile-picture" src="https://loremflickr.com/200/200/Capybara/all?random=1" alt="User Picture">
            <div class="user-name">${username}</div>
          </center>
        </div>
      `;
      ul.style.display = 'flex';
      }else{
        document.getElementById("loading").style.display = 'block';
        document.getElementById("AddAnimalMenu").style.display = 'none';
        document.getElementById("logout-container").style.display = 'none';
        ul = document.getElementById("IsLogged");
        ul.innerHTML = ``;
        ul.style.display = 'none';
        if (currentPathname === '/index.html') {
          document.getElementById("description-container").style.display = 'flex';
          document.getElementById("state-container").style.display = 'block';
        }
      }
      
      
      
    });  
  }

  function saveUserOnDB(){
    email = document.getElementById("emailInput").value
    password = document.getElementById("passInput").value

    if(!(checkUserInput(email,password))){
      //יש להראות הודעת שגיאה למשתמש
      window.alert("Password is too short")
        return
    }


  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log(user.uid)
    currentUser = user
    userString = JSON.stringify(user)
    localStorage.setItem("CurrentUser", userString)
    saveUserOnRTDB(user)
    showUser()


    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
    // ..
  });
}

function login(){
  email = document.getElementById("emailInput").value
  password = document.getElementById("passInput").value
  if(!(checkUserInput(email,password))){
    //יש להראות הודעת שגיאה למשתמש
    window.alert("one of the inputs is invalid")
      return
  }

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user.uid)
    currentUser = user
    userString = JSON.stringify(user)
    localStorage.setItem("CurrentUser", userString)
    // saveUserOnRTDB(currentUser)
    showUser()
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode)
    console.log(errorMessage)
  });
  showUser()
}

function logout(){
  console.log("logout")
  currentUser = {}
  userString = JSON.stringify(currentUser)
  localStorage.setItem("CurrentUser", userString)
  showUser()
  location.reload()
}

//rtdb- real time database
function saveUserOnRTDB(user){
  if(document.getElementById("usernameInput").value == null){
    user.name = user.email;
  }else{
    user.name = document.getElementById("usernameInput").value
  }
  
  firebase.database().ref('users/' + user.uid).set({
    username: user.name,
    email: user.email
  });
}

function checkUserInput(email, password){
  if(password.length < 6 || email==""){
    //יש להראות הודעת שגיאה למשתמש
      return false
  }
  return true
}

function loginShow(){
  document.getElementById("login-container").style.display = 'block';
  document.getElementById("sign-up-container").style.display = 'none';
  document.getElementById("LoginButton").style.display = 'inline';
  document.getElementById("all-container").style.display = 'flex';
  document.getElementById("logout-container").style.display = 'none';
  document.getElementById("all-title").innerHTML = 'Login';
  document.getElementById("description-container").style.display = 'none';
}

function SignUpShow(){

  document.getElementById("LoginButton").style.display = 'none';
  document.getElementById("login-container").style.display = 'block';
  document.getElementById("sign-up-container").style.display = 'block';
  document.getElementById("all-container").style.display = 'flex';
  document.getElementById("logout-container").style.display = 'none';
  document.getElementById("all-title").innerHTML = 'Registration ';
  document.getElementById("description-container").style.display = 'none';
}

function AddAnimalToFB(user){
  console.log("gertevrhyerv")
  AnimalName = document.getElementById("animalNameInput").value
  AnimalID = document.getElementById("animalIdInput").value
  if(AnimalName != "" && AnimalID != ""){
    firebase.database().ref('users/' + user.uid + '/animals/' + AnimalID ).set({
      name: AnimalName,
      id: AnimalID
    });
    alert("thank you for adding your animal!")
    document.getElementById("animalNameInput").value = ""
    document.getElementById("animalIdInput").value = ""
  }else{
    alert("animal id or animal name are empty")
  }
  ShowAnimals()
  locaction.reload()
}



function ShowAnimals(){
  currentUser = JSON.parse(localStorage.getItem("CurrentUser"))
  ul = document.getElementById("ListOfAnimals");
  ul.innerHTML = ``;

  var starCountRef = firebase.database().ref('users/'+currentUser.uid+'/animals');
  starCountRef.once('value', (snapshot) => {
    ListOfAnimals = snapshot.val();
    console.log(ListOfAnimals)
    if(ListOfAnimals != null){
      ImgId = 0;
      for (var key in ListOfAnimals) {
        if (ListOfAnimals.hasOwnProperty(key)) {
          var item = ListOfAnimals[key];
          ul = document.getElementById("ListOfAnimals");
          ul.innerHTML += `
            <tr>
                <td class="animals-td">  <img class="profile-picture" src="https://loremflickr.com/200/200/dog/all?random=${ImgId}" alt="User Picture"></td>
                <td class="animals-td">${item.name}</td>
                <td class="animals-td">${item.id}</td>
                <td class="animals-td" ><i class="fa-solid fa-pen-to-square" onclick="UpdateAnimal('${item.id}')"></i></td>
                <td class="animals-td"><i class="fa-solid fa-trash" onclick="RemoveAnimal('${item.id}')"></i></td>
              
            </tr>
          `;
        }
        ImgId++;
      }
  
    }else{
      ul = document.getElementById("ListOfAnimals");
      ul.innerHTML = ``;
      ul.style.display = 'none';
    }
    
    
    
  });  
}
function UpdateAnimal(AnimalID){
  NewAnimal = window.prompt("Enter the new name to your animal:");
  if(NewAnimal!="" && NewAnimal!=null){
  firebase.database().ref('users/' + currentUser.uid + '/animals/' + AnimalID ).update({
    name: NewAnimal
  });
  location.reload();
}
}
function RemoveAnimal(AnimalID){
  NewAnimal = window.prompt("You sure you want to delete your animals?(Y/N)");
  if(NewAnimal=="Y" || NewAnimal=="y"){
  firebase.database().ref('users/' + currentUser.uid + '/animals/' + AnimalID ).remove()
  location.reload();
  }
}

currentPathname = window.location.pathname;
if (currentPathname === '/index.html') {
  document.getElementById("SignUpButton").addEventListener('click', saveUserOnDB);
  document.getElementById("LoginButton").addEventListener('click', login);
  document.getElementById("LogoutButton").addEventListener('click', logout);
  document.getElementById("LoginStateButton").addEventListener('click', loginShow);
  document.getElementById("SignUpStateButton").addEventListener('click', SignUpShow);

  // Set an interval to change the image every 5 seconds (5000 milliseconds)
  setInterval(changeImage, 2500);
}
if (window.location.pathname === '/AddAnimal.html') {
  document.getElementById("logout-container").style.display = 'block';
  document.getElementById("LogoutButton").addEventListener('click', ()=>{logout(); window.location.href = "/index.html";});
  document.getElementById("AddAnimalButton").addEventListener('click', ()=>{AddAnimalToFB(currentUser)});
}

if (window.location.pathname === '/TempGraph.html') {
  document.getElementById("logout-container").style.display = 'block';
  document.getElementById("LogoutButton").addEventListener('click', ()=>{logout(); window.location.href = "/index.html";});
}
if (window.location.pathname === '/GoogleMaps.html') {
  document.getElementById("logout-container").style.display = 'block';
  document.getElementById("LogoutButton").addEventListener('click', ()=>{logout(); window.location.href = "/index.html";});
}






cntImg = 2;
 function changeImage() {
  const imageElement = document.getElementById("description-img");
  // Update the src attribute with the next image source
  imageElement.src = `/IMG/dog_collar${cntImg}.jpg`;
  // Increment the current image index
  
  if(cntImg <38){
    cntImg++;
  }else{
    cntImg = 1;
  }
}

/**************************************************************************************** */

if (window.location.pathname === '/TempGraph.html') {
  //**** Temperature Graph ****/


function randomNumber(min,max){
  return Math.random() * (max - min) + min;
}

function getData() {
  data  = ""
  var starCountRef = firebase.database().ref('sensors/Temperature');
  starCountRef.on('value', (snapshot) => {
    data = snapshot.val(); //הערך שבתוך הsnapshot
  });
  console.log(data)

  // var starCountRef = firebase.database().ref('users/28/username');
  // starCountRef.on('value', (snapshot) => {
  //   data = snapshot.val(); //הערך שבתוך הsnapshot
  // });
  // console.log(data)
  


  firebase.database().ref('sensors/Temperature').set(randomNumber(37,42));
  return data;
}


var cnt = 0;
cntMax = 100;

var layout = {
  yaxis: {title:"Temperature", side: 'right'},
  title: "Dog's Temp vs. Time"
};

var trace1={
  y:[getData()],
  type:'lines+markers',
      line: {
        color: 'Red',
        width: 1
      },
};


var data = [trace1]

//מכין את הגרף
Plotly.newPlot('chart',data,layout);


//כל כמה זמן הוא בודק מהבייר בייס
setInterval(function(){
  temp = getData()
  container = document.getElementById("temp-container")
    Plotly.extendTraces('chart',{y:[[temp]]}, [0]);
    cnt++;
    if((temp < 39.2) && (temp > 38.3))
    {
      container.style.backgroundColor = "rgb(133, 255, 119)";
      container.style.borderColor  = "rgb(133, 255, 119);"
      TempContainerStr =  `
                            <span id="span-temp">🌡️: ${temp.toFixed(2)}</span>        
                            <h1 class="h1-temp"> Temperature is Good✅💪 </h1>   
                          `
    }else if(temp < 38.3)
    {
      container.style.backgroundColor = "#adf6f5";
      container.style.borderColor  = "#adf6f5;"
      TempContainerStr =  `  
                            <span id="span-temp">🌡️: ${temp.toFixed(2)}</span>       
                             <h1 class="h1-temp"> Temperature is low❌❄️ </h1>   
                          `
    }else
    {
      
      container.style.backgroundColor = "red";
      container.style.borderColor  = "red;"
      TempContainerStr =  ` 
                             <span id="span-temp">🌡️: ${temp.toFixed(2)}</span>        
                             <h1 class="h1-temp"> Temperature is high❌🔥 </h1>   
                          `
    }

    container.innerHTML =  TempContainerStr;

    // if(cnt > cntMax){
    //   Plotly.relayout('chart',{
    //       xaxis: {
    //         range: [cnt , cnt+10000]
    //       }
    //   });
    //   cntMax+=100;
    // }

    Plotly.relayout('chart',{
      xaxis: {title:"Time", range: [cnt-200 , cnt]},
  });
},1000)

}





//************************************************************************* */


//   var temp = 0;
//   var FBUsername2 = 0;
//   let globalData; 
//   var arr= {}
//   function CheckDataFromFB(num, what, check) {
//     var starCountRef = firebase.database().ref('users/'+num+'/'+what);
//     starCountRef.once('value', (snapshot) => {
//       globalData = snapshot.val();
//       console.log(globalData)
//       if(globalData == check){       
//           console.log('true')
//           return true;
//       }else{
//         console.log('false')
//         return false;
//       }
      
//     });   
//   }

//   // Function to retrieve data from Firebase
// function getDataFromFirebase(num, what) {
//   return new Promise((resolve, reject) => {
//     var ref = firebase.database().ref('users/'+num+'/'+what);
//     if(ref != null){
//     ref.once('value')
//       .then((snapshot) => {
//         const data = snapshot.val();
//         resolve(data);
//       })
//       .catch((error) => {
//         reject(error);
//       });
//     }
//   });
// }

// // Function to use async/await to retrieve data
// async function getData(num, what) {
//     const data = await getDataFromFirebase(num, what);
//     return data;

// }

// // // Call the async function to retrieve data
// // kaka = false
// // aaaa = getData(28, 'username').then(value => {if(value == '7'){kaka = true}});
// // console.log(kaka)
  
  
// //   // To use the function:
// //   // x = CheckDataFromFB(28, 'username', '8')

    


// // Initialize a global list to store data
// const UsersList = [];
// // Reference to your Firebase database
// const database = firebase.database();
// // Reference to the data you want to retrieve
// const dataRef = database.ref('users');
// // Fetch the data from Firebase and transfer it to the global list
// function GetUsersFromFB(){
// dataRef.once('value')
//   .then(snapshot => {
//     snapshot.forEach(childSnapshot => {
//       const data = childSnapshot.val();
//       UsersList.push(data);
//     });
//     // Now, UsersList contains the data from Firebase
//     console.log(UsersList);
//   })
//   .catch(error => {
//     console.error('Error fetching data:', error);
//   });
//   console.log(UsersList);
// }

// const LoggedUser = {};
// const LoggedUserRef = database.ref('LoggedUser');
// function GetLoggedInUser() {
//   return new Promise((resolve, reject) => {
//     // Fetch the data from Firebase and transfer it to the global dictionary
//     LoggedUserRef.once('value')
//       .then(snapshot => {
//         snapshot.forEach(childSnapshot => {
//           const key = childSnapshot.key;
//           const value = childSnapshot.val();
//           LoggedUser[key] = value;
//         });

//         // Now, dataDict contains the data from Firebase
//         console.log(LoggedUser);
//         resolve(); // Resolve the Promise when data is fetched
//       })
//       .catch(error => {
//         console.error('Error fetching data:', error);
//         reject(error); // Reject the Promise if an error occurs
//       });
//   });
// }

// GetLoggedInUser()
// console.log(LoggedUser);


// UserID = 0;
// var starCountRef = firebase.database().ref('UserID');
// starCountRef.on('value', (snapshot) => {
//    UserID = snapshot.val() ; //הערך שבתוך הsnapshot
//   console.log(UserID)
// });
// // UserID = 0;


// function Location(lat = 0, lng = 0, title = "", description = ""){
//     this.lat = lat;
//     this.lng = lng;
//     this.title = title;
//     this.description = description;

// }
// function User( username, pass, email, phone){
//     this.id = UserID;
//     UserID++;
//     firebase.database().ref('UserID/' ).set(UserID);
//     // saveListOnDB(UserID, "UserID");
//     this.username = username;
//     this.pass = pass;
//     this.email = email;
//     this.phone = phone;
//     this.locations = [];
// }

// // document.getElementById("SignUpButton").addEventListener('click', addUser);
// // document.getElementById("MarkerButton").addEventListener('click', addLocation);
// // document.getElementById("LoginButton").addEventListener('click', isLogged);



// function addLocation(){
//     lat = document.getElementById("LatInput").value;
//     lng = document.getElementById("LngInput").value;
//     title = document.getElementById("TitleInput").value;
//     description = document.getElementById("DescriptionInput").value;
//     Location1 = new Location(lat, lng, title, description);
//     getListFromDB("index")
//     console.log(index);
//     UsersList[index].locations.push(Location1);
//     saveListOnDB(UsersList, "UsersList");
//     console.log(UsersList); 

//     // UsersList.forEach(element =>{
//     //     if((element.username == LoggedUser.username) && (element.pass = LoggedUser.pass)){
//     //         LoggedUser = element;
//     //         LoggedUser = saveListOnDB(LoggedUser, "LoggedUser");
//     //         getListFromDB()
//     //         console.log(LoggedUser);
//     //          }
//     // });

//     location.reload()
//     // initMap()
    
// }

// // function isLogged(){
// //     username = document.getElementById("usernameInput").value;
// //     pass = document.getElementById("passInput").value;
// //     UsersList.forEach(element =>{
// //         if((element.username == username) && (element.pass = pass)){
// //             LoggedUser = element;
// //             index = LoggedUser.id
// //             saveListOnDB(index, "index")
// //             saveListOnDB(LoggedUser, "LoggedUser");
// //             console.log(`you are logged ${LoggedUser.username}`);
// //             console.log(`${LoggedUser.locations}`);
// //             ul = document.getElementById("IsLogged")
// //             ul.innerHTML = `${LoggedUser.username} 💪`;
// //             initMap();
// //             // location.reload()
// //         }
// //     });
// // }



// function isLoggedFromFB(){
//   username = document.getElementById("usernameInput").value;
//   pass = document.getElementById("passInput").value;
//   FBUsername = ''; 
//   FBPass =''; 
//   FBEmail =''; 
//   FBPhone ='';
//   FBID =0; 
//   flagUser = false;
//   flagPass = false;
//   GetUsersFromFB()

//   UsersList.forEach(element =>{
//       if((element.username == username) && (element.password = pass)){
//           index = LoggedUser.id
//           firebase.database().ref('index/' ).set(index);
//           firebase.database().ref('LoggedUser/' ).set(element);
//           console.log(`you are logged ${LoggedUser.username}`);
//           location.reload()
//       }
//       })

//   var starCountRef = firebase.database().ref('UserID');
// starCountRef.on('value', (snapshot) => {
//    UserID = snapshot.val() ; //הערך שבתוך הsnapshot
//   console.log(UserID)
// });
//   // for(i = 0; i< UserID; i++){
    
//   //     // FBUsername = getData(7, 'username').then(value => {if(value == '7'){console.log(value)}});
//   //     // FBPass = getData(7, 'password').then(value => {if(value == '7'){console.log(value)}});
//   //     // if(flagUser == true && flagPass==true){
//   //     //   console.log('u r innnnn')
//   //     // }
      


  
//   //     //     var CountUsers = firebase.database().ref('users/'+ i+'/email');
//   //     // CountUsers.on('value', (snapshot) => {
//   //     //   FBEmail = snapshot.val() ; //הערך שבתוך הsnapshot
//   //     // });

       
//   //     //     var CountUsers = firebase.database().ref('users/'+ i+'/phone');
//   //     //   CountUsers.on('value', (snapshot) => {
//   //     //   FBPhone = snapshot.val() ; //הערך שבתוך הsnapshot
//   //     //   });

        
//   //     //   var CountUsers = firebase.database().ref('users/'+ i+'/id');
//   //     // CountUsers.on('value', (snapshot) => {
//   //     // FBID = snapshot.val() ; //הערך שבתוך הsnapshot
//   //     // });

//   //     // if((FBUsername == username) && (FBPass == pass)){
//   //     //   User1 = new User(FBUsername, FBPassass, FBEmailemail, FBEmailphone)
//   //     //     LoggedUser = User1;

//   //     //     index = LoggedUser.id;
//   //     //     firebase.database().ref('index/' ).set(index);
//   //     //     firebase.database().ref('LoggedUser/' ).set(LoggedUser);
//   //     //     console.log(`you are logged ${LoggedUser.username}`);
//   //     //     console.log(`${LoggedUser.locations}`);
//   //     //     ul = document.getElementById("IsLogged")
//   //     //     ul.innerHTML = `${LoggedUser.username} 💪`;
//   //     //     initMap();
//   //     //     // location.reload()
//   //     // }
//   // }
// }





// function addUser(){
//     username = document.getElementById("usernameInput").value;
//     pass = document.getElementById("passInput").value;
//     email = document.getElementById("emailInput").value;
//     phone = document.getElementById("phoneInput").value;
//     User1 = new User(username, pass, email, phone);
//  console.log(User1);
//     UsersList.push(User1);
//     saveListOnDB(UsersList, "UsersList");
//     saveUserOnFB(User1)
//     console.log(UsersList); 
//     console.log(UserID);
//     initMap()
// }




// function saveUserOnFB(User){
//   firebase.database().ref('users/' + UserID).set({
//     username: User.username,
//     password: User.pass,
//     email: User.email,
//     phone: User.phone,
//     lacations: User.locations,
//     id: User.id
//   });
  
// }

// function saveListOnDB(List, key){
//     window.localStorage.setItem(key, JSON.stringify(List))
// }
// function getListFromDB(key){
//     postList = window.localStorage.getItem(key)
//     oppList = JSON.parse(postList)
//     return oppList
// }



// function initMap() {
//     // lat1 = parseFloat( localStorage.getItem("lat1"))
//     // lng1 = parseFloat( localStorage.getItem("lng1"))
//     UsersList = getListFromDB("UsersList")
//     LoggedUser = getListFromDB("LoggedUser")
//     if(LoggedUser != null){index = LoggedUser.id;}

    
    
//     var center= {lat: 0, lng: 0};
//     var map = new google.maps.Map(document.getElementById('map'), {
//       zoom: 1,
//       center: center,
//       tilt: 0,
//       heading: 360,
//       mapId: "488c76cff2b4aa87",
//       styles: [
//         {
//             "stylers": [
//                 {
//                     "hue": "#2c3e50"
//                 },
//                 {
//                     "saturation": 250
//                 }
//             ]
//         },
//         {
//             "featureType": "road",
//             "elementType": "geometry",
//             "stylers": [
//                 {
//                     "lightness": 50
//                 },
//                 {
//                     "visibility": "simplified"
//                 }
//             ]
//         },
//         {
//             "featureType": "road",
//             "elementType": "labels",
//             "stylers": [
//                 {
//                     "visibility": "on"
//                 }
//             ]
//         }
//     ],
//     });

//     const buttons = [
//         ["Rotate Left", "rotate", 20, google.maps.ControlPosition.LEFT_CENTER],
//         ["Rotate Right", "rotate", -20, google.maps.ControlPosition.RIGHT_CENTER],
//         ["Tilt Down", "tilt", 20, google.maps.ControlPosition.TOP_CENTER],
//         ["Tilt Up", "tilt", -20, google.maps.ControlPosition.BOTTOM_CENTER],
//       ];
    
//       buttons.forEach(([text, mode, amount, position]) => {
//         const controlDiv = document.createElement("div");
//         const controlUI = document.createElement("button");
    
//         controlUI.classList.add("ui-button");
//         controlUI.innerText = `${text}`;
//         controlUI.addEventListener("click", () => {
//           adjustMap(mode, amount);
//         });
//         controlDiv.appendChild(controlUI);
//         map.controls[position].push(controlDiv);
//       });
    
//       const adjustMap = function (mode, amount) {
//         switch (mode) {
//           case "tilt":
//             map.setTilt(map.getTilt() + amount);
//             break;
//           case "rotate":
//             map.setHeading(map.getHeading() + amount);
//             break;
//           default:
//             break;
//         }
//       };



    
    

//     var infoWindowContent = []
//     var markers = []
//     var results = addCordsAndInfo();
//     infoWindowContent = results[0];
//     markers = results[1];
    

//     console.log(index)

//     console.log(UsersList)
//     console.log(UsersList[index].locations);
//     console.log(infoWindowContent[1])

//     console.log(markers)
    


//  var infoWindow = new google.maps.InfoWindow({maxWidth: 200,}), marker,i;


//  const drawingManager = new google.maps.drawing.DrawingManager({
//     drawingMode: google.maps.drawing.OverlayType.MARKER,
//     drawingControl: true,
//     drawingControlOptions: {
//       position: google.maps.ControlPosition.TOP_CENTER,
//       drawingModes: [
//         google.maps.drawing.OverlayType.MARKER,
//       ],
//     },
//     markerOptions: {
//       icon: "IMG\\marker.png",
//     }
//   });
// drawingManager.setMap(map);


// google.maps.event.addListener(drawingManager, 'overlaycomplete', function (event) {
//     if (event.type === google.maps.drawing.OverlayType.MARKER) {
//         var marker = event.overlay;
//         // marker.addListener('rightclick', function () {
//         //     deleteMarker(marker);
//         //     var results = addCordsAndInfo();
//         //     infoWindow = results[0];
//         //     markers = results[1];
//         // }); 
//             addMarker(marker);
//             var results = addCordsAndInfo();
//             infoWindow = results[0];
//             markers = results[1];
//             initMap()
            
//          }
//      });

//   for(i = 0; i<markers.length; i++){
//     position= markers[i];
//     var random = Math.floor(Math.random() * 16) + 1;
//      marker = new google.maps.Marker({
//           position: position,
//           map: map,
//           icon: `IMG\\marker.png`,
//           animation: google.maps.Animation.DROP,
//         });
        
        
        
        

//         google.maps.event.addListener(marker, 'click', (function(marker,i){
//                 return function(){
//                     infoWindow.setContent(infoWindowContent[i]);
//                     infoWindow.open(map,marker);
//                     if (marker.getAnimation() !== null) {
//                         marker.setAnimation(null);
//                       } else {
//                         marker.setAnimation(google.maps.Animation.BOUNCE);
//                       }
//                 }
//         })(marker, i));

        
//         google.maps.event.addListener(marker, 'rightclick', (function(marker){
//             return function(){
//                 deleteMarker(marker)

//             }
//         })(marker));


//         google.maps.event.addListener(marker, 'dblclick', (function(marker){
//             return function(){
//                 console.log("double click")
//                 editMarker(marker)
//                 var results = addCordsAndInfo();
//                 infoWindow = results[0];
//                 markers = results[1];
//                 initMap()
//             }
//         })(marker));

        
      



//      }
  


//      function editMarker(marker) {
//         var newTitle = prompt("Enter a new title:");
//         var newDescription = prompt("Enter a new description:");
      
//         UsersList = getListFromDB("UsersList")
//         LoggedUser = getListFromDB("LoggedUser")
//         index = getListFromDB("index")


//           var location = {
//             lat: marker.getPosition().lat(),
//             lng: marker.getPosition().lng(),
//             title: newTitle,
//             description: newDescription,
//           };
      
//           // Update LoggedUser.locations and UsersList[index].locations
//           var loggedUserLocations = LoggedUser.locations;
//           var usersListLocations = UsersList[index].locations;
      
//           // Find the marker's location in the arrays and update its properties
//           var loggedUserIndex = LoggedUser.locations.findIndex((loc) => loc.lat === location.lat && loc.lng === location.lng );
//           var usersListIndex = UsersList[index].locations.findIndex((loc) => loc.lat === location.lat && loc.lng === location.lng );
//           console.log(loggedUserIndex)
//           console.log(usersListIndex)
//           if (loggedUserIndex != -1) {
//             LoggedUser.locations[loggedUserIndex].title = newTitle;
//             LoggedUser.locations[loggedUserIndex].description = newDescription;
//           }
      
//           if (usersListIndex != -1) {
//             UsersList[index].locations[usersListIndex].title = newTitle;
//             UsersList[index].locations[usersListIndex].description = newDescription;
//           }

//           saveListOnDB(LoggedUser, "LoggedUser");
//           saveListOnDB(UsersList, "UsersList");
       
//       }
      


// function deleteMarker(marker) {
//     marker.setMap(null);
//     console.log("aaaaaaaaaaaaaaaaaaaa")
    

//     var location = {
//       lat: marker.getPosition().lat(),
//       lng: marker.getPosition().lng(),
//       title: marker.title,
//       description: marker.description
//     };
  
//     var loggedUserLocations = LoggedUser.locations;
//     var usersListLocations = UsersList[index].locations;
  
//     // Find and remove the marker's location from the arrays
//     var loggedUserIndex = loggedUserLocations.findIndex((loc) => loc.lat === location.lat && loc.lng === location.lng && loc.title === location.title && loc.description === location.description);
//     var usersListIndex = usersListLocations.findIndex((loc) => loc.lat === location.lat && loc.lng === location.lng && loc.title === location.title && loc.description === location.description);
  
//     if (loggedUserIndex !== -1) {
//       loggedUserLocations.splice(loggedUserIndex, 1);
//     }
  
//     if (usersListIndex !== -1) {
//       usersListLocations.splice(usersListIndex, 1);
//     }
  
//     saveListOnDB(LoggedUser, "LoggedUser");
//     saveListOnDB(UsersList, "UsersList");
//     // initMap()
//   }
  
  
//   function addMarker(marker) {
//     var position = marker.getPosition();
//     var title1 = prompt("Please enter a title:");
//     var description1 = prompt("Please enter a description:");

    
//     var location = {
//       lat: position.lat(),
//       lng: position.lng(),
//       title: title1,
//       description: description1
//     };
  
//     // Update LoggedUser.locations and UsersList[index].locations
//     LoggedUser.locations.push(location);
//     UsersList[index].locations.push(location);
//     saveListOnDB(LoggedUser, "LoggedUser");
//     saveListOnDB(UsersList, "UsersList");
//     // marker.addListener('rightclick', function () {
//     //   deleteMarker(marker);
//     // });
//     // initMap()
//   }
  
//   function addCordsAndInfo(){
//     UsersList = getListFromDB("UsersList")
//     LoggedUser = getListFromDB("LoggedUser")
//     if(LoggedUser != null){index = LoggedUser.id;}

//     var infoWindowContent1 = []
//     var markers1 = []
//     if(UsersList[index].locations !=  null){
//     UsersList[index].locations.forEach(element =>{
//         addstring = `
//                     <div>
//                         <h1 id="firstHeading" class="firstHeading">${element.title  }</h1>
//                         <img class="profile" src="https://loremflickr.com/200/200/capybara/all?random=1"  ></img>
//                         <p>${element.description}</p>
//                         <p>Location:${element.lat},${element.lng}</p>
//                     </div>
//             `
            
//         marker1 = { lat: parseFloat(element.lat), lng: parseFloat(element.lng)}
//         markers1.push(marker1)
//         infoWindowContent1.push(addstring)
        
//     });
// }
//     return [infoWindowContent1, markers1]
//   }



  
//   }

  
  
//   window.initMap = initMap;

