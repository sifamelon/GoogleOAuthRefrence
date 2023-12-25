import { View, Text,StyleSheet,Platform,Image, Pressable, Alert, ScrollView } from 'react-native'
import {charmanderData,bulbasaurData,pikachuData,squirtleData} from "../Data/Data"
import React from 'react'
const PokemonCard=({name,hp,image,weaknesses,moves,type})=>{
  const {borderColor,emoji}=getTypeDetails(type)
  const handelPress=(emoji,type,name)=>{
    Alert.alert(`${name}`,`has power ${emoji} ${type}`)
  }
  return(
<View style={style.card}>
      <View style={style.nameContainer}>
        <Text style={style.name}>{name}</Text>
        <Text style={style.hp}>❤️{hp}</Text>
      </View>
      <View style={{alignItems:'center'}}>
        <Image accessibilityLabel={`${name} Pokemon`} resizeMode='contain' style={style.Image} source={image}/>
      </View>
      <Pressable onPress={()=>handelPress(emoji,type,name)}>
      <View style={style.typecontainer}>
      <View style={[{borderColor},style.badge]}>
        <Text style={style.typeEmoji}>{emoji}</Text>
        <Text style={style.textType}>{type}</Text>
      </View>
      </View>
      </Pressable>
      <View style={style.movesContainer} >
        <Text style={style.movesText}>Movies: {moves.join(",")}</Text>
      </View>
      <View style={style.weaknessContainer}>
        <Text style={style.weaknessText}>Weakness: {weaknesses.join(",")}</Text>
      </View>
    </View>
  )
}

const Pokemon = () => {
  
  
  return (
    <ScrollView>
      <PokemonCard {...charmanderData}/>
      <PokemonCard {...bulbasaurData}/>
      <PokemonCard {...pikachuData}/>
      <PokemonCard {...squirtleData}/>
    </ScrollView>
  )
}
const style=StyleSheet.create({
  card:{
      backgroundColor:"white",
      borderRadius:20,
      borderWidth:3,
      borderColor:"blue",
      padding:16,
      margin:16,
      ...Platform.select({
          ios:{
              shadowColor:"#33333",
      shadowOffset:{
          width:2,
          height:2
      },
      shadowOpacity:0.6,
      shadowRadius:9
          },
      android:{
          elevation:10
      }
      })
  },
  nameContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    
    marginBottom:20
  },
  name:{
    fontSize:30,
fontWeight:'bold',
  },
  hp:{
    fontSize:20,
  },
  Image:{
    width:"100%",
    height:250
  },
  typecontainer:{
    marginTop:12,
    marginBottom:45,
    alignItems:"center"
    // borderWidth:2,
    // borderRadius:9,
    // alignItems:'center'
  },
  badge:{
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 4,
    
  },
  typeEmoji:{
    fontSize:30,
    marginRight:8
  },
  textType:{
    fontSize:22,
    fontWeight:'bold'
  },
  movesContainer: {
    marginBottom: 12,
  },
  movesText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  weaknessContainer: {
    marginBottom: 8,
  },
  weaknessText: {
    fontSize: 22,
    fontWeight: "bold",
  },
})
const getTypeDetails = (type) => {
switch (type.toLowerCase()) {
  case "electric":
    return { borderColor: "#FFD700", emoji: "⚡️" };
  case "water":
    return { borderColor: "#6493EA", emoji: "💧" };
  case "fire":
    return { borderColor: "#FF5733", emoji: "🔥" };
  case "grass":
    return { borderColor: "#66CC66", emoji: "🌿" };
  default:
    return { borderColor: "#A0A0A0", emoji: "❓" };
}
};

export default Pokemon