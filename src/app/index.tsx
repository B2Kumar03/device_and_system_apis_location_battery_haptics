import {
  Text,
  View,
  StyleSheet,
  Button,
  ScrollView,
} from "react-native";

import React, { useState } from "react";

import * as Battery from "expo-battery";

import ExpoNetwork from "@/components/ExpoNetwork";



export default function Index() {


  const level = Battery.useBatteryLevel();

  const state = Battery.useBatteryState();

  const lowPowerMode = Battery.useLowPowerMode();



  const [events,setEvents] = useState<string[]>([]);



  const stateLabel = () => {


    switch(state){


      case Battery.BatteryState.CHARGING:

        return "Charging 🔌";



      case Battery.BatteryState.FULL:

        return "Full 🔋";



      case Battery.BatteryState.UNPLUGGED:

        return "Not Charging";



      default:

        return "Unknown";

    }


  };





  const addEvent = () => {


    const newEvent =
    `${new Date().toLocaleTimeString()} - Battery ${
      Math.round((level ?? 0) * 100)
    }%`;



    setEvents(prev=>[
      newEvent,
      ...prev
    ]);


  };





  return (


    <ScrollView style={styles.container}>


      <Text style={styles.title}>
        Expo Battery Monitor
      </Text>





      <View style={styles.card}>


        <Text style={styles.label}>
          Battery Level
        </Text>



        <Text style={styles.value}>
          {
            level !== null
            ?
            `${Math.round(level * 100)}%`
            :
            "Unknown"
          }
        </Text>



      </View>








      <View style={styles.card}>


        <Text style={styles.label}>
          Battery Status
        </Text>



        <Text style={styles.value}>
          {stateLabel()}
        </Text>


      </View>









      <View style={styles.card}>


        <Text style={styles.label}>
          Low Power Mode
        </Text>



        <Text style={styles.value}>


          {
            lowPowerMode
            ?
            "Enabled ⚡"
            :
            "Disabled"
          }


        </Text>



      </View>







      <Button

        title="Add Battery Event"

        onPress={addEvent}

      />







      <View style={styles.eventBox}>


        <Text style={styles.eventTitle}>
          Battery Events
        </Text>



        {
          events.map((item,index)=>(


            <Text
              key={index}
              style={styles.event}
            >

              {item}

            </Text>


          ))
        }


      </View>






      <Text style={styles.title}>
        Network
      </Text>



      <ExpoNetwork/>




    </ScrollView>


  );

}





const styles = StyleSheet.create({


  container:{


    flex:1,

    padding:20,


  },



  title:{


    fontSize:24,

    fontWeight:"bold",

    marginVertical:20,


  },



  card:{


    backgroundColor:"#eee",

    padding:20,

    borderRadius:15,

    marginBottom:15,


  },



  label:{


    fontSize:16,

    color:"#555",


  },



  value:{


    fontSize:28,

    fontWeight:"bold",

    marginTop:10,


  },



  eventBox:{


    marginTop:20,

    padding:15,

    backgroundColor:"#f5f5f5",

    borderRadius:10,


  },



  eventTitle:{


    fontSize:18,

    fontWeight:"bold",


  },



  event:{


    marginTop:8,


  },


});