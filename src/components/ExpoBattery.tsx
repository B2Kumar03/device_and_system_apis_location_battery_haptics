import {
  StyleSheet,
  Text,
  View,
  Button,
} from "react-native";

import React, { useState } from "react";

import * as Battery from "expo-battery";



const ExpoBattery = () => {


  // Battery percentage (0 - 1)
  const level = Battery.useBatteryLevel();



  // Battery state
  const state = Battery.useBatteryState();



  // Low power mode
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



      case Battery.BatteryState.UNKNOWN:

        return "Unknown";



      default:

        return "Unknown";


    }


  };








  const addEvent = () => {


    const message =
    `${new Date().toLocaleTimeString()} - Battery ${
      Math.round((level ?? 0) * 100)
    }%`;



    setEvents(prev => [

      message,

      ...prev

    ]);

  };







  return (

    <View style={styles.container}>


      <Text style={styles.title}>
        🔋 Battery Information
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

            "Loading..."

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

          "ON ⚡"

          :

          "OFF"

          }


        </Text>


      </View>







      <Button

        title="Add Battery Event"

        onPress={addEvent}

      />







      <View style={styles.eventBox}>


        <Text style={styles.eventTitle}>
          Battery History
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





    </View>

  );


};



export default ExpoBattery;







const styles = StyleSheet.create({


  container:{


    padding:20,


  },



  title:{


    fontSize:24,

    fontWeight:"bold",

    marginBottom:20,


  },



  card:{


    backgroundColor:"#eeeeee",

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

    marginBottom:10,


  },



  event:{


    marginTop:5,


  },


});