<link rel="stylesheet" href="../style/page/add.scss">
<template>
  <div class="container_add">
    <div class="erreur" v-if="popup">
      <p>{{this.erreur}}</p>
    </div>
    <div class="valide" v-if="popupV">
      <p>{{this.message}}</p>
    </div>
    <div class="container_inputFile">
      <h1>Ajouter un nouveau trainning</h1>
      <div class="inputFile" @click="inputFile()"><img src="../assets/bookmark.svg" alt=""></div>
      <input type="file" id="myFile" name="filename" />
      <button class="button" @click="upload()">Upload</button>
    </div>
    <button class="button" @click="addSeance()">Ajouter ça séance</button>
  </div>

</template>

<script>
import axios from "axios";
import AddSeance from "@/components/AddSeance.vue";

export default {
  name: "add",
  computed: {
    AddSeance() {
      return AddSeance
    }
  },
  data() {
    return {
      erreur: "Voici l'erreur",
      popup: false,
      popupV: false,
      message: "Voici le message"
    }
  },
  methods: {
    addSeance() {
      this.$router.push("/addSeance");
    },
    inputFile() {
      document.getElementById("myFile").click();
    },
    upload() {
      //recuperer le pdf et le lire dans la div file
      function getDaysToDate(days){
        let date = new Date();
        let day = date.getDay();
        let diff = days - day;
        let dateTime =  date.setDate(date.getDate() + diff);
        dateTime = new Date(dateTime);
        if( diff < 1){
          dateTime.setDate(dateTime.getDate() + 7)
        }
        //return au format datetime sql
        return dateTime.toLocaleDateString()
      }
      let file = document.getElementById("myFile").files[0];
      //si l'input est vide alors on affiche un message d'erreur
      if (file === undefined) {
        this.popup = true;
        this.erreur = "Veuillez choisir un fichier";
        //attendre 2 secondes et enlever le message d'erreur
        setTimeout(() => {
          this.popup = false;
        }, 2000);
      }
      //si le fichier est pas un txt alors on affiche un message d'erreur
      if (file.type !== "text/plain") {
        this.popup = true;
        this.erreur = "Veuillez choisir un fichier en .txt";
        //attendre 2 secondes et enlever le message d'erreur
        setTimeout(() => {
          this.popup = false;
        }, 2000);
      }

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = async function () {
        // lire la base64 en .txt et l'enregistrer
        let base64data = reader.result;
        let text = atob(base64data.split(',')[1]);
        //split avec un regex
        let days = ["vide", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
        let array = text.split(/Lundi|Mardi|Mercredi|Jeudi|Vendredi|Samedi|Dimanche/g);
        //json sera la variable envoyer au serveur
        let json = {};
        for (const el of array) {
          const index = array.indexOf(el);
          //Split ou il y a plus de 2 \n
          let ele = el.split(/[\r\n]{2,}/g);

          json = {
            ...json,
            [days[index]]: {
              warmUp: [],
              skills: [],
              date_entrainement: null
            }
          }
          for (const e of ele) {
            const key = ele.indexOf(e);
            if (e !== "" && e.length >= 3) {
              //si e contient le mot perform dans la phrase
              if (e.match(/perform /g)) {
                let skills = ele.filter((element, index) => {
                  if (index > key)
                    return element;
                });
                let warmUp = ele.filter((element, index) => {
                  if (index < key) {
                    return element;
                  }
                });

                // refusionner les tableau en string

                //dans les tableaus supprimer les caractere vide
                warmUp = warmUp.filter((el) => {
                  if (el !== "" ) {
                    return el;
                  }
                });

                skills = skills.filter((el) => {
                  if (el !== "" ) {
                    return el;
                  }
                });
                skills = {
                  title: skills[0],
                  data: skills.slice(1)
                }
                warmUp = {
                  title: warmUp[0],
                  data: warmUp.slice(1)
                }
                json[days[index]].warmUp = warmUp
                json[days[index]].skills = skills

                if (days[index] !== "vide") {
                  json[days[index]].date_entrainement = getDaysToDate(index);
                  json[days[index]].warmUp.data = json[days[index]].warmUp.data.join("\n");
                  json[days[index]].skills.data = json[days[index]].skills.data.join("\n");
                  try {
                    let data = await axios.post("http://localhost:3000/api/entrainement/", {
                          date_entrainement: json[days[index]].date_entrainement,
                          warm_ups: [json[days[index]].warmUp],
                          skills: [json[days[index]].skills],
                          idUser: localStorage.getItem("idUser")
                        },
                        {
                          headers: {
                            "Content-Type": "application/json",
                            "Access-Control-Allow-Origin": "*",
                            "x-access-token" : localStorage.getItem("token")
                          }
                        })
                  }catch (e) {
                    console.log(e)
                    return;
                  }


                }

              }
            }
          }
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
