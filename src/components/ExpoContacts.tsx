import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  TextInput,
  ActivityIndicator,
} from "react-native";

import React, { useEffect, useState } from "react";

import * as Contacts from "expo-contacts";



const ExpoContacts = () => {


  const [permission, requestPermission] =
    Contacts.usePermissions();



  const [contacts,setContacts] =
    useState<Contacts.Contact[]>([]);



  const [filteredContacts,setFilteredContacts] =
    useState<Contacts.Contact[]>([]);



  const [search,setSearch] =
    useState("");



  const [loading,setLoading] =
    useState(false);






  const getContacts = async()=>{


    try{


      setLoading(true);



      const result =
      await Contacts.getContactsAsync({



        fields:[

          Contacts.Fields.Name,

          Contacts.Fields.PhoneNumbers

        ],


        sort: Contacts.SortTypes.FirstName,


      });




      if(result.data.length > 0){


        setContacts(result.data);


        setFilteredContacts(result.data);


      }




    }
    catch(error){


      console.log(
        "Contact Error",
        error
      );


    }
    finally{


      setLoading(false);


    }


  };








  useEffect(()=>{


    if(permission?.granted){


      getContacts();


    }


  },[permission]);









  const searchContact = (text:string)=>{


    setSearch(text);



    const data =
    contacts.filter((item)=>{


      const name =
      item.name?.toLowerCase();



      return name?.includes(
        text.toLowerCase()
      );


    });



    setFilteredContacts(data);



  };









  if(!permission){


    return (

      <View style={styles.center}>


        <Text>
          Checking permission...
        </Text>


      </View>

    );


  }








  if(!permission.granted){


    return (

      <View style={styles.center}>


        <Text>
          Need Contacts Permission
        </Text>



        <Button

          title="Allow Contacts"

          onPress={requestPermission}

        />


      </View>


    );


  }










  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        📱 Contacts
      </Text>





      <TextInput


        placeholder="Search contact"


        value={search}


        onChangeText={searchContact}


        style={styles.input}


      />








      {
        loading &&

        <ActivityIndicator
          size="large"
        />

      }








      <FlatList


        data={filteredContacts}


        keyExtractor={(item)=>
          item.id ?? Math.random().toString()
        }



        onRefresh={getContacts}


        refreshing={loading}





        renderItem={({item})=>(



          <View style={styles.card}>


            <Text style={styles.name}>

              {item.name}

            </Text>





            {
              item.phoneNumbers?.map((phone,index)=>(


                <Text
                  key={index}
                  style={styles.phone}
                >

                  {phone.number}

                </Text>


              ))

            }



          </View>



        )}


      />




    </View>


  );


};



export default ExpoContacts;








const styles = StyleSheet.create({



  container:{


    flex:1,


    padding:20,


  },



  title:{


    fontSize:24,


    fontWeight:"bold",


    marginBottom:15,


  },



  input:{


    borderWidth:1,


    borderColor:"#ccc",


    borderRadius:10,


    padding:12,


    marginBottom:15,


  },



  card:{


    backgroundColor:"#eee",


    padding:15,


    borderRadius:12,


    marginBottom:10,


  },



  name:{


    fontSize:18,


    fontWeight:"bold",


  },



  phone:{


    marginTop:5,


    color:"#555",


  },



  center:{


    flex:1,


    justifyContent:"center",


    alignItems:"center",


  },


});