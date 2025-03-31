import React from 'react';
import { StyleSheet, View, FlatList, Text } from 'react-native';
import TaskItem from './TaskItem';

const TaskList = ({ tasks, onToggle, onDelete }) => {
  if (tasks.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>タスクがありません</Text>
        <Text style={styles.emptySubText}>新しいタスクを追加してください</Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TaskItem
          task={item}
          onToggle={() => onToggle(item.id)}
          onDelete={() => onDelete(item.id)}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    flex: 1,
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

export default TaskList; 