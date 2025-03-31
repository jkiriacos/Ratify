import { Card, Image, Text, Group, Badge, Button, CardSection, Anchor } from '@mantine/core';
import classes from './BadgeCard.module.css';
import { Link } from 'next/link';
import { UserContext } from '@/controllers/UserInfo';
import { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FollowButton } from '@/app/clubhome/FollowButton';

const { createClient } = require('@supabase/supabase-js');
const supabaseURL = process.env.SUPABASE_URL;
const supabaseKEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseURL, supabaseKEY);

const retrieve_club_id = async (club_name) => {
  const {data: clubid, error} = await supabase
    .from('Club Profile')
    .select('clubid')
    .eq('name',club_name)
  const club_id = clubid[0].clubid
  return club_id
}

export const BadgeCard = props => {
  const user = useContext(UserContext);
  const userid = user.userid
  const features = props.tags.map(tag => (
    <Badge color="white" variant="light" key={tag}>
      {tag}
    </Badge>
  ));
  const router = useRouter();
  return (
    <Card withBorder radius="md" p="md" className={classes.card}>
      <CardSection>
        <Image src={props.image} alt={props.name} height={150} />
      </CardSection>

      <CardSection className={classes.section} mt="md">
        <Group justify="apart">
          <Anchor
            variant="gradient"
            gradient={{ from: 'white', to: '#971B2F' }}
            fz="lg"
            fw={500}
            onClick={async () => {
              const club_id = await retrieve_club_id(props.name)
              user.updateClubId(club_id)
              router.push('/clubhome');
            }}
            underline="never"
          >
            {props.name}
          </Anchor>
        </Group>
      </CardSection>

      <CardSection className={classes.tagsection}>
        <Text mt="md" className={classes.label} c="dimmed">
          Perfect for you, if you enjoy
        </Text>
        <Group gap={7} mt={5}>
          {features}
        </Group>
      </CardSection>
      <CardSection className={classes.buttonsection}>
        <Group mt="xs">
        {props.name ? <FollowButton clubName = {props.name} userID = {userid}/> : <Button color="#971B2F" w={295}></Button>}
        </Group>
      </CardSection>
    </Card>
  );
};