import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';
import { useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  const metrics = [
    { title: 'Total Issues', value: '156', icon: 'list', color: colors.coral },
    { title: 'In Progress', value: '23', icon: 'time', color: colors.blue },
    { title: 'Completed', value: '89', icon: 'checkmark-circle', color: '#4ECDC4' },
    { title: 'Overdue', value: '5', icon: 'warning', color: '#FF6B6B' },
  ];

  const recentSprints = [
    { name: 'Sprint 23', progress: 85, daysLeft: 3 },
    { name: 'Sprint 22', progress: 100, daysLeft: 0 },
    { name: 'Sprint 21', progress: 92, daysLeft: 0 },
  ];

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Dashboard</Text>
        <TouchableOpacity style={[styles.filterButton, { borderColor: colors.blue }]}>
          <Ionicons name="filter" size={20} color={colors.blue} />
          <Text style={[styles.filterText, { color: colors.blue }]}>Filter</Text>
        </TouchableOpacity>
      </View>

      {/* Metrics Grid */}
      <View style={styles.metricsGrid}>
        {metrics.map((metric, index) => (
          <View key={index} style={[styles.metricCard, { backgroundColor: colors.white }]}>
            <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
              <Ionicons name={metric.icon} size={24} color={metric.color} />
            </View>
            <Text style={[styles.metricValue, { color: colors.text }]}>{metric.value}</Text>
            <Text style={[styles.metricTitle, { color: colors.text }]}>{metric.title}</Text>
          </View>
        ))}
      </View>

      {/* Sprint Progress */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Active Sprints</Text>
        {recentSprints.map((sprint, index) => (
          <View key={index} style={[styles.sprintCard, { backgroundColor: colors.white }]}>
            <View style={styles.sprintHeader}>
              <Text style={[styles.sprintName, { color: colors.text }]}>{sprint.name}</Text>
              <Text style={[styles.sprintDays, { color: colors.coral }]}>
                {sprint.daysLeft > 0 ? `${sprint.daysLeft} days left` : 'Completed'}
              </Text>
            </View>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { 
                      width: `${sprint.progress}%`,
                      backgroundColor: sprint.progress === 100 ? '#4ECDC4' : colors.coral 
                    }
                  ]} 
                />
              </View>
              <Text style={[styles.progressText, { color: colors.text }]}>{sprint.progress}%</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Team Activity */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Team Activity</Text>
        <View style={[styles.activityCard, { backgroundColor: colors.white }]}>
          <View style={styles.activityItem}>
            <View style={[styles.avatar, { backgroundColor: colors.coral }]}>
              <Text style={styles.avatarText}>JD</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityName, { color: colors.text }]}>John Doe</Text>
              <Text style={[styles.activityText, { color: colors.text }]}>
                Completed issue "Fix login bug"
              </Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.text }]}>2h ago</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.avatar, { backgroundColor: colors.blue }]}>
              <Text style={styles.avatarText}>AS</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityName, { color: colors.text }]}>Alice Smith</Text>
              <Text style={[styles.activityText, { color: colors.text }]}>
                Started work on "Dashboard redesign"
              </Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.text }]}>4h ago</Text>
          </View>

          <View style={styles.activityItem}>
            <View style={[styles.avatar, { backgroundColor: '#4ECDC4' }]}>
              <Text style={styles.avatarText}>MJ</Text>
            </View>
            <View style={styles.activityContent}>
              <Text style={[styles.activityName, { color: colors.text }]}>Mike Johnson</Text>
              <Text style={[styles.activityText, { color: colors.text }]}>
                Created new issue "Mobile app testing"
              </Text>
            </View>
            <Text style={[styles.activityTime, { color: colors.text }]}>6h ago</Text>
          </View>
        </View>
      </View>
    </ScrollView>
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
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: '600',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  metricCard: {
    width: '48%',
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
  metricIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    textAlign: 'center',
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sprintCard: {
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
  sprintHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sprintName: {
    fontSize: 16,
    fontWeight: '600',
  },
  sprintDays: {
    fontSize: 12,
    fontWeight: '600',
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#E5E5E5',
    borderRadius: 3,
    marginRight: 12,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activityCard: {
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  activityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  activityContent: {
    flex: 1,
  },
  activityName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  activityText: {
    fontSize: 12,
    opacity: 0.8,
  },
  activityTime: {
    fontSize: 10,
    opacity: 0.6,
  },
}); 