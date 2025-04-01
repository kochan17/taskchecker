import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, View, Text, SafeAreaView, KeyboardAvoidingView, Platform, TouchableOpacity } from 'react-native';
import TaskInput from '@/components/TaskInput';
import TaskList from '@/components/TaskList';
import { useAuth } from '@/contexts/AuthContext';
import { db } from '@/firebase/config';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp 
} from 'firebase/firestore';
import { User } from 'firebase/auth';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

// 型定義
interface Task {
  id: string;
  text: string;
  completed: boolean;
  userId: string;
  createdAt: any; // FirestoreのTimestamp型
}

// AuthContextの型を定義
interface AuthContextType {
  currentUser: User | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<any>;
  signup: (email: string, password: string) => Promise<any>;
}

const TaskApp: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, logout } = useAuth() || { 
    currentUser: null, 
    logout: async () => {} 
  };
  const user = currentUser as User | null;

  // Firestoreからタスクを取得
  useEffect(() => {
    if (!user?.uid) {
      setLoading(false);
      return;
    }

    const tasksRef = collection(db, 'tasks');
    const q = query(
      tasksRef,
      where('userId', '==', user.uid),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const taskList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Task[];
        setTasks(taskList);
        setLoading(false);
      }, 
      () => setLoading(false)
    );

    return unsubscribe;
  }, [user]);

  // タスクを追加
  const addTask = useCallback(async (text: string) => {
    if (!text.trim() || !user?.uid) return;
    
    try {
      await addDoc(collection(db, 'tasks'), {
        text,
        completed: false,
        userId: user.uid,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      // エラー処理は静かに失敗
    }
  }, [user]);

  // タスクの完了状態を切り替え
  const toggleTask = useCallback(async (id: string) => {
    try {
      const task = tasks.find(t => t.id === id);
      if (task) {
        await updateDoc(doc(db, 'tasks', id), {
          completed: !task.completed
        });
      }
    } catch (error) {
      // エラー処理は静かに失敗
    }
  }, [tasks]);

  // タスクを削除
  const deleteTask = useCallback(async (id: string) => {
    try {
      await deleteDoc(doc(db, 'tasks', id));
    } catch (error) {
      // エラー処理は静かに失敗
    }
  }, []);

  // ログアウト処理
  const handleLogout = useCallback(async () => {
    try {
      await logout();
    } catch (error) {
      // エラー処理は静かに失敗
    }
  }, [logout]);

  // タスクが空の場合のコンポーネント
  const EmptyTaskList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>タスクがありません</Text>
      <Text style={styles.emptySubText}>新しいタスクを追加してください</Text>
    </View>
  );

  // ローディング中のコンポーネント
  const LoadingIndicator = () => (
    <View style={styles.loadingContainer}>
      <Text>読み込み中...</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.header}>
          <Text style={styles.title}>タスクリスト</Text>
          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>ログアウト</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <LoadingIndicator />
        ) : tasks.length > 0 ? (
          <TaskList 
            tasks={tasks} 
            onToggle={toggleTask} 
            onDelete={deleteTask} 
          />
        ) : (
          <EmptyTaskList />
        )}
        
        <TaskInput onAddTask={addTask} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default function TaskScreen() {
  return <TaskApp />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#f44336',
    borderRadius: 4,
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#888',
  },
  emptySubText: {
    fontSize: 14,
    color: '#888',
    marginTop: 8,
  },
});
