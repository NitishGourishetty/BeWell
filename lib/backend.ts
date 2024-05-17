import {supabase} from './supabase'
//Session and Session Information can be passed into this function as well -> Improvements for the future - Nitish
import { Session } from '@supabase/supabase-js'
import { useState } from 'react'
import { Alert } from 'react-native'

//Some functions will need to have a seperate await and loading states when implemented
export async function getUserProfile(session) {
    try {
        if (!session || !session.user) {
            console.log(session)
            throw new Error('Invalid session or user data!');
        }
  
        const { data, error, status } = await supabase
          .from('profiles')
          .select(`first_name, last_name`)
          .eq('id', session?.user.id)
          .single()
        if (error && status !== 406) {
          throw error
        }
  
        return data;
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
          return null;
        }
      } finally {
      }
}
export async function getFriendProfile(user_id: String) {
  try {

      const { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user_id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
        return null;
      }
    } finally {
    }
}

export async function updateProfile({
    session,
    first_name,
    last_name,
  }: {
    session: Session
    first_name: string
    last_name: string
  }) {
    try {
      if (!session || !session.user) {
        console.log(session)
        throw new Error('Invalid session or user data!');
    }

      const updates = {
        id: session?.user.id,
        first_name,
        last_name,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
    }
  }
  export async function addLikes(session: Session, post_id: Number) {
    try {
        // Check if the session and user are valid
        if (!session || !session.user) {
            console.log(session)
            throw new Error('Invalid session or user data!');
        }

        // Fetch the existing likes array from the database for the specific
        const {data,error} = await supabase
            .from('posts')
            .select('likes')
            .eq('id', 1)
            .single();
        if (error) {
          
            throw error;
        }

        // Extract likes array from the fetched data
        const likes: string[] = data?.likes || [];

        // Check if the user's ID is already in the likes array
        const userId = session.user.id;
        if (!likes.includes(userId)) {
            // Append the user's ID to the likes array
            const updatedLikes = [...likes, userId];

            // Update the likes array in the database for the specific post
            const { data: updateData, error: updateError } = await supabase
                .from('posts')
                .update({ likes: updatedLikes })
                .eq('id', 1)
                .select()

            if (updateError) {
               
                throw updateError;
            }

           
        }
    } catch (error) {
        console.error('Error adding likes:', error.message);
        // Propagate the error to the caller
        throw error;
    }
}

  export async function finishOnboarding(session) {
    try {
      if (!session || !session.user) {
            console.log(session)
            throw new Error('Invalid session or user data!');
        }

      const updates = {
        id: session?.user.id,
        onboarded: true,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
    }
  }

  export async function checkOnboardStatus(session) {
    try {
        if (!session || !session.user) {
            console.log(session)
            throw new Error('Invalid session or user data!');
        }
  
        const { data, error, status } = await supabase
          .from('profiles')
          .select(`onboarded`)
          .eq('id', session?.user.id)
          .single()
        if (error && status !== 406) {
          throw error
        }
        return data;
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
          return null;
        }
      } finally {
      }
}

export async function addHabit(session, habitText, startTime, endTime, visibility) {
    try {
      if (!session || !session.user) {
            console.log(session)
            throw new Error('Invalid session or user data!');
        }
      const { error } = await supabase
      .from('habits')
      .insert({habit_info: habitText, profile: session?.user.id, time_start: startTime, time_end: endTime, public: visibility })

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  //Add visibleTo (category!!!!!)
  export async function addPost(session, imgUrl, caption, habit_id) {
    try {
      if (!session || !session.user) {
            console.log(session)
            throw new Error('Invalid session or user data!');
        }
      const { error } = await supabase
      .from('posts')
      .insert({profile: session?.user.id, img_url:imgUrl, caption:caption, habit: habit_id })

    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    }
  }

  export async function getPostsForHabit(session: Session, habitID) {
    try {
      if (!session || !session.user) {
        console.log(session)
        throw new Error('Invalid session or user data!');
    }
        const { data, error, status } = await supabase
          .from('posts')
          .select('img_url, caption, created_at')
          .eq('profile', session?.user.id)
          .eq('habit', habitID)
        if (error && status !== 406) {
          throw error
        }
        return data;
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
          return null;
        }
      } finally {
      }
}


export async function getUsersHabits(session: Session) {
    try {
      if (!session || !session.user) {
        console.log(session)
        throw new Error('Invalid session or user data!');
    }
  
        const { data, error, status } = await supabase
          .from('habits')
          .select('habit_info, time_start, time_end, streak, id')
          .eq('profile', session?.user.id)
        if (error && status !== 406) {
          throw error
        }
        return data;
      } catch (error) {
        if (error instanceof Error) {
          Alert.alert(error.message)
          return null;
        }
      } finally {
      }
}

export async function getFriendsPosts(session: Session) {
  try {
    console.log(session)
    if (!session) {
      
      throw new Error('Invalid session or user data in FriendsPosts!');
  }

    const { data, error, status } = await supabase.from('posts')
    .select('img_url, created_at, likes, profile, caption, habit, id')
    .contains("visibleTo", [session.user.id]);
    const profileName =  await getFriendProfile(data[0].profile)
    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return {data, profileName};
    }

  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message);
    }
    return
  }
}
// export async function getPosts (session: Session){
//   try{
//     if (!session || !session.user) {
        //     console.log(session)
        //     throw new Error('Invalid session or user data!');
        // };

//     const { data, error, status } = await supabase.from('posts').select('img_url').neq('img_url', "NULL");

//     if (error && status !== 406) {
//       throw error;
//     }

//     if (data) {
//       return data;
//     }
//   }catch(error){
//     if(error instanceof Error){
//       Alert.alert(error.message);
//     }
//     return
//   }
// }

//Change this to make it ID
export async function getSpecificHabit({ habit_info, session }: { habit_info: string, session: Session }) {
  try {
    if (!session || !session.user) {
            console.log(session)
            throw new Error('Invalid session or user data!');
        }

    const { data, error, status } = await supabase
      .from('habits')
      .select('habit_info, public, id')
      .eq('profile', session?.user.id)
      .eq('habit_text', habit_info)
    if (error && status !== 406) {
      throw error
    }
    return data;
  } catch (error) {
    if (error instanceof Error) {
      Alert.alert(error.message)
      return null;
    }
  } finally {
  }
}

