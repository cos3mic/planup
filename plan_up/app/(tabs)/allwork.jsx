import { StyleSheet, View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

const issueData = [
  {
    id: '1',
    title: 'Fix login authentication bug',
    project: 'MAD',
    priority: 'High',
    status: 'In Progress',
    assignee: 'John Doe',
    type: 'Bug',
  },
  {
    id: '2',
    title: 'Implement user dashboard',
    project: 'MAD',
    priority: 'Medium',
    status: 'To Do',
    assignee: 'Alice Smith',
    type: 'Story',
  },
  {
    id: '3',
    title: 'Design mobile app icons',
    project: 'WRD',
    priority: 'Low',
    status: 'Done',
    assignee: 'Mike Johnson',
    type: 'Task',
  },
  {
    id: '4',
    title: 'API endpoint testing',
    project: 'API',
    priority: 'High',
    status: 'In Progress',
    assignee: 'Sarah Wilson',
    type: 'Bug',
  },
  {
    id: '5',
    title: 'Database schema update',
    project: 'DBM',
    priority: 'Medium',
    status: 'To Do',
    assignee: 'David Brown',
    type: 'Story',
  },
];

const statusColors = {
  'To Do': '#E5E5E5',
  'In Progress': '#FF6B6B',
  'Done': '#4ECDC4',
};

const priorityColors = {
  'High': '#FF6B6B',
  'Medium': '#FFA500',
  'Low': '#4ECDC4',
};

const typeColors = {
  'Bug': '#FF6B6B',
  'Story': '#4ECDC4',
  'Task': '#45B7D1',
};

export default function AllWorkScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [selectedFilter, setSelectedFilter] = useState('All');

  const filters = ['All', 'My Work', 'Recent', 'Overdue'];

  const renderIssueCard = ({ item }) => (
    <TouchableOpacity style={[styles.issueCard, { backgroundColor: colors.white }]}>
      <View style={styles.issueHeader}>
        <View style={styles.issueType}>
          <View style={[styles.typeBadge, { backgroundColor: typeColors[item.type] }]}>
            <Text style={styles.typeText}>{item.type}</Text>
          </View>
          <Text style={[styles.projectKey, { color: colors.text }]}>{item.project}</Text>
        </View>
        <View style={[styles.priorityBadge, { backgroundColor: priorityColors[item.priority] + '20' }]}>
          <Text style={[styles.priorityText, { color: priorityColors[item.priority] }]}>
            {item.priority}
          </Text>
        </View>
      </View>

      <Text style={[styles.issueTitle, { color: colors.text }]}>{item.title}</Text>

      <View style={styles.issueFooter}>
        <View style={styles.assigneeInfo}>
          <View style={[styles.avatar, { backgroundColor: colors.coral }]}>
            <Text style={styles.avatarText}>
              {item.assignee.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <Text style={[styles.assigneeName, { color: colors.text }]}>{item.assignee}</Text>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: statusColors[item.status] }]}>
          <Text style={[styles.statusText, { color: colors.text }]}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>All Work</Text>
        <TouchableOpacity style={[styles.addButton, { backgroundColor: colors.coral }]}>
          <Ionicons name="add" size={24} color={colors.white} />
        </TouchableOpacity>
      </View>

      {/* Filter Tabs */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterContainer}
        contentContainerStyle={styles.filterContent}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[
              styles.filterTab,
              selectedFilter === filter && { backgroundColor: colors.coral }
            ]}
            onPress={() => setSelectedFilter(filter)}
          >
            <Text style={[
              styles.filterText,
              { color: selectedFilter === filter ? colors.white : colors.text }
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Quick Stats */}
      <View style={styles.statsContainer}>
        <View style={[styles.statCard, { backgroundColor: colors.white }]}>
          <Ionicons name="list" size={24} color={colors.coral} />
          <Text style={[styles.statValue, { color: colors.text }]}>156</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Total Issues</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.white }]}>
          <Ionicons name="time" size={24} color={colors.blue} />
          <Text style={[styles.statValue, { color: colors.text }]}>23</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>In Progress</Text>
        </View>
        <View style={[styles.statCard, { backgroundColor: colors.white }]}>
          <Ionicons name="checkmark-circle" size={24} color="#4ECDC4" />
          <Text style={[styles.statValue, { color: colors.text }]}>89</Text>
          <Text style={[styles.statLabel, { color: colors.text }]}>Completed</Text>
        </View>
      </View>

      {/* Issues List */}
      <FlatList
        data={issueData}
        renderItem={renderIssueCard}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    paddingHorizontal: 20,
  },
  filterContent: {
    paddingRight: 20,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  statCard: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  listContainer: {
    padding: 20,
  },
  issueCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  issueHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  issueType: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  typeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  projectKey: {
    fontSize: 12,
    fontWeight: '600',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  issueTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    lineHeight: 22,
  },
  issueFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  assigneeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  avatarText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  assigneeName: {
    fontSize: 12,
    fontWeight: '500',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
}); 