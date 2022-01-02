import React, {useState, useEffect} from 'react';
import { SafeAreaView, Text, View, Alert, Button, ScrollView } from 'react-native';
import styles from './StyleSheet';

function Home(props) {

    const axios = require("axios");
    const [toDoList, setToDoList] = useState([])


    const instance = axios.create({
        baseURL: '<-- url for "toDoAppAPI"-->',
        headers: {
          'Accept': 'application/json',
        }
      });

      const get_to_do_list = () =>
      {
   

        try {
          instance.get(`/`)
            .then(result => {
       
              
              setToDoList(result.data)
      
            })
            .catch(err => res.send(err));
        }
        catch (err) {
          console.error(err);
        }

      }




      useEffect(() => {

        get_to_do_list();
    
       }, [])


       const add = (text) =>
       {

        let params = new URLSearchParams();
        params.append('todo', text);
        

        try {
          instance.post("/add",params)
            .then(res => {

              get_to_do_list();

            }

            )
            .catch(err => alert(err));
        }
        catch (err) {
  
          console.error(err);
        }


       }



       const delete_title = (id) =>
       {

        let params = new URLSearchParams();
        params.append('id', id);
        

        try {
          instance.post("/delete_title",params)
            .then(res => {

              get_to_do_list();

            }

            )
            .catch(err => alert(err));
        }
        catch (err) {
  
          console.error(err);
        }


       }
    
   



    return (
      <SafeAreaView>
        <ScrollView>
      

<View>
<Text style={styles.header}>TO DO LIST</Text>
<Text onPress={()=> get_to_do_list()} style={styles.reload}>⏎</Text>
<Text onPress={()=> Alert.prompt("Add", "Add a title", (text)=>add(text))} style={styles.add_title}>Add</Text>
</View>
        

<View style={{
  marginTop: 20,
  borderTopColor: 'black',
  borderTopWidth: 1,
  
  }}
  
  >

{toDoList.map((value, index) => (

<View style={{
  borderBottomColor: 'black',
  borderBottomWidth: 1,
}}>
<Text style={{fontSize: 20, padding: 10}}>
{value["title"]}


</Text>
<Text 
onPress={() => {delete_title(value["id"])}}
style={styles.delete_title}>Delete</Text>

</View>

))}

</View>

</ScrollView>

          
      </SafeAreaView>
    );
}

export default Home;