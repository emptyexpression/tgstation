import { decodeHtmlEntities } from 'common/string';
import { Fragment } from 'inferno';
import { useBackend } from '../backend';
import { Box, Button, NoticeBox, Section, LabeledList } from '../components';

export const RemoteRobotControl = props => {
  const { act, data } = useBackend(props);
  const {
    robots = [],
  } = data;

  if (!robots.length) {
    return (
      <Section>
        <NoticeBox textAlign="center">
          No robots detected
        </NoticeBox>
      </Section>
    );
  }

  return (
    <Section>
      {robots.map(robot => (
        <Section
          key={robot.ref}
          title={robot.name + " (" + robot.model + ")"}
          buttons={(
            <Fragment>
              <Button
                icon="tools"
                content="Interface"
                onClick={() => act('interface', {
                  ref: robot.ref,
                })} />
              <Button
                icon="phone-alt"
                content="Call"
                onClick={() => act('callbot', {
                  ref: robot.ref,
                })} />
            </Fragment>
          )}>
          <LabeledList>
            <LabeledList.Item label="Status">
              <Box inline color={decodeHtmlEntities(robot.mode) === "Inactive"
                ? 'bad'
                : decodeHtmlEntities(robot.mode) === "Idle"
                  ? 'average'
                  : 'good'}>
                {decodeHtmlEntities(robot.mode)}
              </Box>
              {' '}
              {robot.hacked && (
                <Box inline color="bad">
                  (HACKED)
                </Box>
              ) || "" }
            </LabeledList.Item>
            <LabeledList.Item label="Location">
              {robot.location}
            </LabeledList.Item>
          </LabeledList>
        </Section>
      ))}
    </Section>
  );
};
