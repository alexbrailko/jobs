import React, { Component } from "react";
import { View, Text, Platform, ScrollView, Linking } from "react-native";
import { Button, Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { MapView } from 'expo';

class ReviewScreen extends Component {
	static navigationOptions = ({ navigation }) => {
		
		return {
			tabBarLabel: 'review jobs',
			tabBarIcon: ({ tintColor }) => (
				<Icon name="favorite" size={25} color={tintColor} />
			),
			title: 'Review Jobs',
			headerRight: (
				<Button
					title="Settings"
					onPress={() => navigation.navigate('settings')}
					backgroundColor="rgba(0,0,0,0)"
					color="rgba(0, 122, 255, 1)"
				/>
			),
			headerStyle: {
				
			}
		};
	};

	renderLikedJobs() {
		return this.props.likedJobs.map(job => {
			const { company, formattedRelativeTime, url, latitude, longitude, jobtitle, jobkey } = job;
			const initialRegion = {
				latitude,
				longitude,
				latitudeDelta: 0.09,
				longitudeDelta: 0.04,
			};

			return (
				<Card title={jobtitle} key={jobkey}>
					<View style={{ height: 200 }}>
						<MapView
							scrollEnabled={false}
							style={{ flex: 1 }}
							cacheEnabled={Platform.OS === 'android' ? true : false}
							initialRegion={this.initialRegion}
						/>
						<View style={styles.detailWrapper}>
							<Text style={styles.italics}>{company}</Text>
							<Text style={styles.italics}>{formattedRelativeTime}</Text>
						</View>
						<Button
							title="Apply now"
							backgroundColor="#03A9F4" 
							onPress={() => Linking.openURL(url)}
						/>
					</View>
				</Card>
			);
		});
	}

	render() {
		return (
			<ScrollView>
				{this.renderLikedJobs()}
			</ScrollView>
		);
	}
}

const styles = {
	detailWrapper: {
		marginTop: 10,
		marginBottom: 10,
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	italics: {
		fontStyle: 'italic'
	}
};

mapstateToProps = (state) => {
	return { likedJobs: state.likedJobs };
};

export default connect(mapstateToProps)(ReviewScreen);
