import React, { Component } from "react";
import { View, Text, Platform } from "react-native";
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { Card, Button, Icon } from 'react-native-elements';

import * as actions from '../actions';
import Swipe from '../components/Swipe';

class DeckScreen extends Component {
	static navigationOptions = {
		tabBarLabel: 'jobs',
		tabBarIcon: ({ tintColor }) => (
			<Icon name="description" size={25} color={tintColor} />
		),
	};

	renderCard(job) {
		const initialRegion = {
			latitude: job.latitude,
			longitude: job.longitude,
			latituteDelta: 0.045,
			longitudeDelta: 0.02
		};

		return (
			<Card title={job.jobtitle}>
			<View style={{ height: 300 }}>
				<MapView
					scrollEnabled={false}
					style={{ flex: 1 }}
					cacheEnabled={Platform.OS === 'android' ? true : false}
					initialRegion={this.initialRegion}
				>
				</MapView>
			</View>
				<View style={styles.detailWrapper}>
					<Text>{job.company}</Text>
					<Text>{job.formattedRelativeTime}</Text>
				</View>
				<Text>
					{job.snippet.replace(/<b>/g, '').replace(/<\/b>/g, '')}
				</Text>
			</Card>
		);
	}

	renderNoMoreCards = () => {
		return (
			<Card title="No more jobs">
				<Button 
					title="Back to map" 
					large 
					icon={{ name: "my-location" }} 
					onPress={() => this.props.navigation.navigate('map')} 
				/>
			</Card>
		);
	}

	render() {
		return (
			<View style={{ marginTop: 10 }}>
				<Swipe  
					data={this.props.jobs}
					renderCard={this.renderCard}
					renderNoMoreCards={this.renderNoMoreCards}
					onSwipeRight={job => this.props.likeJob(job)}
					keyProp="jobkey"
				/>
			</View>
		);
	}
}

const styles = {
	detailWrapper: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginBottom: 10
	}
};

function mapsStateToProps({ jobs }) {
	return { jobs: jobs.results };
}

export default connect(mapsStateToProps, actions)(DeckScreen);
