import * as React from "react-native"
import { SafeAreaView, Pressable, ScrollView, StyleSheet } from "react-native";
import { Text, View } from "react-native-ui-lib"
import { useWindowDimensions } from "react-native";
import { useCustomFonts } from "../../assets/fonts/fontDeclarations";
import StreaksModule from "./StreaksModule";
import CalendarModule from "./CalendarModule";
import HabitsModule from "./HabitsModule";
import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import { Session } from "@supabase/supabase-js";
import { addHabit, getUsersHabits } from "../../lib/backend";



export type HabitsModuleProps = {
  habitName: String;
  time_start: String;
  time_end: String,
  index: Number;
}
export default function MainHomePage() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [habitData, setHabitData] = useState(null)


  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)


    })
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })


  }, [])

  async function getHabitInfo() {
    try {
        setLoading(true)
      if (!session?.user) throw new Error('No user on the session!')
      let data = await getUsersHabits(session);
      if(data && data!=undefined) {
       //Do Stuff with data
       setHabitData(data)
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message)
        console.log("ERROR MAIN PAGE")
      }
    } finally {
        setLoading(false)
    }
  }
  useEffect(() => {
    if (session) getHabitInfo()
  }, [session])
  const user = "user";
  useCustomFonts();

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View style={{ justifyContent: "center", flexDirection: "column", alignItems: "center" }}>
          <Text style={styles.Subheading}>
            Calendar
          </Text>
          <CalendarModule />
          <Text style={styles.Subheading}>
            Streaks
          </Text>
          <StreaksModule days={10} color={'red'} />
          <Text style={styles.Subheading}>
            Habits
          </Text>
          {habitData ? Object.entries(habitData).map((habit, index) => {
                      return(
                        <HabitsModule 
                          habitName={Object.values(habit[1])[0]} 
                          time_start={Object.values(habit[1])[1]} 
                          time_end={Object.values(habit[1])[2]} index={index} 
                        />
                      );
                    }) : undefined}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  Subheading: {
    fontFamily: "Poppins-SemiBold",
    fontSize: 22,
    marginBottom: "4%",
    marginTop: "4%",
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    marginLeft: '7%'
  }
})
