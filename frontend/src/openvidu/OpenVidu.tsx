/** @jsxImportSource @emotion/react */
// import React, { useState, useEffect, useCallback } from 'react';
// import {
// 	OpenVidu,
// 	Session as OVSession,
// 	Publisher,
// 	Subscriber,
// } from 'openvidu-browser';

const Openvidu: React.FC = () => {
  // const [session, setSession] = useState<OVSession | ''>('');
  // const [sessionId, setSessionId] = useState<string>('');
  // const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  // const [publisher, setPublisher] = useState<Publisher | null>(null);
  // const [OV, setOV] = useState<OpenVidu | null>(null);

  // const OPENVIDU_SERVER_URL = `https://j10a401.p.ssafy.io:4443/`;
  // const OPENVIDU_SERVER_SECRET = 'team401';

  // const leaveSession = useCallback(() => { // 세션 해제
  // 	if (session) session.disconnect();
  // 	setOV(null);
  // 	setSession('');
  // 	setSessionId('');
  // 	setSubscriber(null);
  // 	setPublisher(null);
  // }, [session]);

  // const joinSession = () => { //  join 세션
  // 	const OVs = new OpenVidu();
  // 	setOV(OVs);
  // 	setSession(OVs.initSession());
  // };

  // useEffect(() => {
  // 	window.addEventListener('beforeunload', leaveSession);

  // 	return () => {
  // 		window.removeEventListener('beforeunload', leaveSession);
  // 	};
  // }, [leaveSession]);
  //
  // const sessionIdChangeHandler = (
  // 	event: React.ChangeEvent<HTMLInputElement>,
  // ) => {
  // 	setSessionId(event.target.value);
  // };

  // useEffect(() => {
  // 	if (session === '') return;

  // 	session.on('streamDestroyed', event => {
  // 		if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
  // 			setSubscriber(null);
  // 		}
  // 	});
  // }, [subscriber, session]);

  // useEffect(() => {
  // 	if (session === '') return;

  // 	session.on('streamCreated', event => {
  // 		const subscribers = session.subscribe(event.stream, '');
  // 		setSubscriber(subscribers);
  // 	});
  //
  // const createSession = async (sessionIds: string): Promise<string> => {
  // 	try {
  // 		const data = JSON.stringify({ customSessionId: sessionIds });
  // 		const response = await axios.post(
  // 			`${OPENVIDU_SERVER_URL}/openvidu/api/sessions`,
  // 			data,
  // 			{
  // 				headers: {
  // 					Authorization: `Basic ${btoa(
  // 						`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
  // 					)}`,
  // 					'Content-Type': 'application/json',
  // 				},
  // 			},
  // 		);
  //
  // 		return (response.data as { id: string }).id;
  // 	} catch (error) {
  // 		const errorResponse = (error as AxiosError)?.response;
  //
  // 		if (errorResponse?.status === 409) {
  // 			return sessionIds;
  // 		}
  //
  // 		return '';
  // 	}
  // };
  //
  // 	const createToken = (sessionIds: string): Promise<string> => {
  // 		return new Promise((resolve, reject) => {
  // 			const data = {};
  // 			axios
  // 				.post(
  // 					`${OPENVIDU_SERVER_URL}/openvidu/api/sessions/${sessionIds}/connection`,
  // 					data,
  // 					{
  // 						headers: {
  // 							Authorization: `Basic ${btoa(
  // 								`OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`,
  // 							)}`,

  // 							'Content-Type': 'application/json',
  // 						},
  // 					},
  // 				)
  // 				.then(response => {
  // 					resolve((response.data as { token: string }).token);
  // 				})
  // 				.catch(error => reject(error));
  // 		});
  // 	};

  // 	const getToken = async (): Promise<string> => {
  // 		try {
  // 			const sessionIds = await createSession(sessionId);
  // 			const token = await createToken(sessionIds);
  // 			return token;
  // 		} catch (error) {
  // 			throw new Error('Failed to get token.');
  // 		}
  // 	};

  // 	getToken()
  // 		.then(token => {
  // 			session
  // 				.connect(token)
  // 				.then(() => {
  // 					if (OV) {
  // 						const publishers = OV.initPublisher(undefined, {
  // 							audioSource: undefined,
  // 							videoSource: undefined,
  // 							publishAudio: true,
  // 							publishVideo: true,
  // 							mirror: true,
  // 						});

  // 						setPublisher(publishers);
  // 						session
  // 							.publish(publishers)
  // 							.then(() => {})
  // 							.catch(() => {});
  // 					}
  // 				})
  // 				.catch(() => {});
  // 		})
  // 		.catch(() => {});
  // }, [session, OV, sessionId, OPENVIDU_SERVER_URL]);

  return <></>;
};

export default Openvidu;
