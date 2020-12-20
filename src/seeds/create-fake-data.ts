import { Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import bcrypt from 'bcrypt'

import User from '../entities/User'
import Sub from '../entities/Sub'
import Post from '../entities/Post'
import Comment from '../entities/Comment'
import Vote from '../entities/Vote'

function timePlus(duration = 0) {
  const time = new Date('2020-11-07 07:01:43.18').getTime()

  return new Date(time + duration).toISOString()
}

export default class CreateData implements Seeder {
  public async run(_: any, connection: Connection): Promise<any> {
    const password = await bcrypt.hash('123456', 6)

    const minute = 1000 * 60
    const hour = minute * 60
    const day = hour * 24

    // Create users
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          username: 'john',
          email: 'john@email.com',
          password,
          createdAt: timePlus(),
          updatedAt: timePlus(),
        },
        {
          username: 'jane',
          email: 'jane@email.com',
          password,
          createdAt: timePlus(minute * 5),
          updatedAt: timePlus(minute * 5),
        },
      ])
      .execute()

    const john = await User.findOne({ username: 'john' })
    const jane = await User.findOne({ username: 'jane' })

    // Create subs
    await connection
      .createQueryBuilder()
      .insert()
      .into(Sub)
      .values([
        {
          name: 'reactjs',
          title: 'React JS Developer Community',
          description: 'A group of React JS fanboys',
          user: john,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          name: 'funny',
          title: 'Everything Funny',
          description: 'If you cant joke your life is a joke',
          user: jane,
          createdAt: timePlus(minute * 25),
          updatedAt: timePlus(minute * 25),
        },
        {
          name: 'InsightfulQuestions',
          title: 'Insightful Questions',
          description: "Questions that make you go 'Ohhh'",
          user: john,
          createdAt: timePlus(minute * 30),
          updatedAt: timePlus(minute * 30),
        },
        {
          name: 'oneliners',
          title: 'Oneliners',
          description:
            'A variety of funny, one line jokes in a well-moderated, friendly community!',
          user: john,
          createdAt: timePlus(hour),
          updatedAt: timePlus(hour),
        },
        {
          name: 'readyplayerone',
          title: 'Ready Player One',
          description: 'Your nexus for all things Ready Player One',
          user: jane,
          createdAt: timePlus(hour),
          updatedAt: timePlus(hour),
        },
        {
          name: 'reallyannoyingsounds',
          title: 'Ahhhhhhhhhhhhhhhhh',
          description:
            'Ahhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh',
          user: jane,
          createdAt: timePlus(hour),
          updatedAt: timePlus(hour),
        },
      ])
      .execute()

    const reactJsSub = await Sub.findOne({ where: { name: 'reactjs' } })
    const funnySub = await Sub.findOne({ where: { name: 'funny' } })
    const iqSub = await Sub.findOne({ where: { name: 'InsightfulQuestions' } })
    const oneliners = await Sub.findOne({ where: { name: 'oneliners' } })

    // Create posts
    await connection
      .createQueryBuilder()
      .insert()
      .into(Post)
      .values([
        {
          // id: 1
          identifier: 'rggenVY',
          title: 'React 17 is out!!',
          slug: 'react_17_is_out',
          body: 'But it has no new features...',
          user: john,
          sub: reactJsSub,
          createdAt: timePlus(minute * 20),
          updatedAt: timePlus(minute * 20),
        },
        {
          // id: 2
          identifier: '00fOyPQ',
          title: 'Comparing Redux to Vue composition API',
          slug: 'comparing_redux_to_vue_composition_api',
          body: 'It feels like Redux is too much boilerplate',
          user: jane,
          sub: reactJsSub,
          createdAt: timePlus(hour),
          updatedAt: timePlus(hour),
        },
        {
          // id: 3
          identifier: 'IvzYvbG',
          title: "What's your favourite React component library?",
          slug: 'whats_your_favourite_react_component_library',
          body: '(title) Mine is @material-ui',
          user: john,
          sub: reactJsSub,
          createdAt: timePlus(hour + minute * 30),
          updatedAt: timePlus(hour + minute * 30),
        },
        {
          // id: 4
          identifier: 'DnwJSvj',
          title:
            'What is the difference between healthy venting and shit talking?',
          slug:
            'what_is_the_difference_between_healthy_venting_and_shit_talking',
          body:
            'What exactly does “talking behind your back” mean? When does giving an aggressive rant to a friend become disloyalty? Gossip?',
          user: jane,
          sub: iqSub,
          createdAt: timePlus(minute * 40),
          updatedAt: timePlus(minute * 40),
        },
        {
          // id: 5
          identifier: 'saUwqdP',
          title:
            "What's the most difficult thing when you try to change your job?",
          slug:
            'whats_the_most_difficult_thing_when_you_try_to_change_your_job',
          body: `This 2020 was a hard year for everyone, on June 2, my first son born. 
            I've too much stuff in my mind at this moment and one of them is finding a new job. My question is, 
            what's the most difficult thing when you try to change your job? I'm still in my comfort zone and I'm scared, 
            any advice to help me to take the step?`,
          user: john,
          sub: iqSub,
          createdAt: timePlus(hour + minute * 40),
          updatedAt: timePlus(hour + minute * 40),
        },
        {
          // id: 6
          identifier: 'ckVoiPf',
          title:
            'What was the most important social lesson you learned when you were younger?',
          slug:
            'what_was_the_most_important_social_lesson_you_learned_when_you_were_younger',
          body: `I'm still relatively young, and I'm learning more and more about social situations and how people react to anything at all. I'd love to hear your advice and experiences that helped you.`,
          user: jane,
          sub: iqSub,
          createdAt: timePlus(3 * hour),
          updatedAt: timePlus(3 * hour),
        },
        {
          // id: 7
          identifier: 'tbkzHxF',
          title:
            'Why do cows never have any money? Because the farmers milk them dry!',
          slug:
            'why_do_cows_never_have_any_money_because_the_farmers_milk_them_dry',
          user: john,
          sub: funnySub,
          createdAt: timePlus(9 * day),
          updatedAt: timePlus(9 * day),
        },
        {
          // id: 8
          identifier: 'CEPVxjR',
          title:
            "You would think that taking off a snail's shell would make it move faster, but it actually just makes it more sluggish.",
          slug:
            'you_would_think_that_taking_off_a_snails_shell_would_make_it_move_faster_but_it_actually_just_makes_it_more_sluggish',
          user: jane,
          sub: funnySub,
          createdAt: timePlus(10 * day),
          updatedAt: timePlus(10 * day),
        },
        {
          // id: 9
          identifier: 'FyztVqe',
          title: 'I ate a clock yesterday, it was very time-consuming.',
          slug: 'i_ate_a_clock_yesterday_it_was_very_time_consuming',
          user: john,
          sub: funnySub,
          createdAt: timePlus(10 * day + 2 * hour),
          updatedAt: timePlus(10 * day + 2 * hour),
        },
        {
          // id: 10
          identifier: 'kk0GXky',
          title: 'What’s the best thing about Switzerland?',
          slug: 'whats_the_best_thing_about_switzerland',
          body: 'I don’t know, but the flag is a big plus.',
          user: john,
          sub: funnySub,
          createdAt: timePlus(3 * day),
          updatedAt: timePlus(3 * day),
        },
        {
          // id: 11
          identifier: 'aWbiMTf',
          title: 'I invented a new word: Plagiarism!',
          slug: 'i_invented_a_new_word_plagiarism',
          user: john,
          sub: funnySub,
          createdAt: timePlus(4 * day),
          updatedAt: timePlus(4 * day),
        },
        {
          // id: 12
          identifier: 'eOMqOFS',
          title:
            'Did you hear about the mathematician who’s afraid of negative numbers?',
          slug:
            'did_you_hear_about_the_mathematician_whos_afraid_of_negative_numbers',
          body: 'He’ll stop at nothing to avoid them.',
          user: jane,
          sub: funnySub,
          createdAt: timePlus(5 * day),
          updatedAt: timePlus(5 * day),
        },
        {
          // id: 13
          identifier: 'u1PZphn',
          title: 'Helvetica and Times New Roman walk into a bar',
          slug: 'helvetica_and_times_new_roman_walk_into_a_bar',
          body:
            '“Get out of here!” shouts the bartender. “We don’t serve your type.”',
          user: john,
          sub: funnySub,
          createdAt: timePlus(6 * day),
          updatedAt: timePlus(6 * day),
        },
        {
          // id: 14
          identifier: 'HylUYd5',
          title: 'Dove chocolate taste better than their soap.',
          slug: 'dove_chocolate_taste_better_than_their_soap',
          user: john,
          sub: oneliners,
          createdAt: timePlus(day + hour),
          updatedAt: timePlus(day + hour),
        },
        {
          // id: 15
          identifier: 'PwsDv25',
          title: 'Raisin Awareness',
          slug: 'raisin_awareness',
          body:
            "I've been telling everyone about the benefits of eating dried grapes -- it's all about raisin awareness.",
          user: jane,
          sub: oneliners,
          createdAt: timePlus(day + 2 * hour),
          updatedAt: timePlus(day + 2 * hour),
        },
        {
          // id: 16
          identifier: 'iqx3acA',
          title:
            'Iron Man and War Machine are cool, but there’s a stark difference between them.',
          slug:
            'iron_man_and_war_machine_are_cool_but_theres_a_stark_difference_between_them',
          user: john,
          sub: oneliners,
          createdAt: timePlus(day + 6 * hour),
          updatedAt: timePlus(day + 6 * hour),
        },
        {
          // id: 17
          identifier: 'oCSW50J',
          title:
            'The adjective for metal is metallic, but not so for iron, which is ironic.',
          slug:
            'the_adjective_for_metal_is_metallic_but_not_so_for_iron_which_is_ironic',
          user: jane,
          sub: oneliners,
          createdAt: timePlus(day + 8 * hour),
          updatedAt: timePlus(day + 8 * hour),
        },
      ])
      .execute()

    const post6 = await Post.findOne(6)
    const post7 = await Post.findOne(7)
    const post8 = await Post.findOne(8)
    const post9 = await Post.findOne(9)

    // Create comments
    await connection
      .createQueryBuilder()
      .insert()
      .into(Comment)
      .values([
        {
          body: "That' punny hahaha!!",
          post: post7,
          user: john,
          identifier: 'wZ9m66zb',
          createdAt: timePlus(10 * day + 5 * hour),
          updatedAt: timePlus(10 * day + 5 * hour),
        },
        {
          body: 'Poor cows hahaha',
          post: post7,
          user: jane,
          identifier: 'G9ntregv',
          createdAt: timePlus(10 * day + 3 * hour),
          updatedAt: timePlus(10 * day + 3 * hour),
        },
        {
          body: 'To work even when I didnt have to!!',
          post: post6,
          user: john,
          identifier: 'JFd7haNZ',
          createdAt: timePlus(9 * day + hour * 2),
          updatedAt: timePlus(9 * day + hour * 2),
        },
        {
          body: "It's funny cuz it's true haha!",
          post: post8,
          user: john,
          identifier: 'VOLXaQzd',
          createdAt: timePlus(10 * day + 2 * hour),
          updatedAt: timePlus(10 * day + 2 * hour),
        },
        {
          body: "At least we're enjoying the milk I guess hihi",
          post: post7,
          user: jane,
          identifier: 'MCqqWy8r',
          createdAt: timePlus(10 * day + 4 * hour),
          updatedAt: timePlus(10 * day + 4 * hour),
        },
        {
          body: 'This is so bad, I dont know why im laughing Hahahaha!!',
          post: post9,
          user: jane,
          identifier: 'VxnlwvEx',
          createdAt: timePlus(10 * day + 7 * hour),
          updatedAt: timePlus(10 * day + 7 * hour),
        },
      ])
      .execute()

    const comment1 = await Comment.findOne(1)
    const comment2 = await Comment.findOne(2)

    // Create votes
    await connection
      .createQueryBuilder()
      .insert()
      .into(Vote)
      .values([
        { value: 1, user: john, post: post9 },
        { value: 1, user: jane, post: post9 },
        { value: 1, user: jane, post: post8 },
        { value: 1, user: john, comment: comment1 },
        { value: 1, user: jane, comment: comment1 },
        { value: 1, user: john, comment: comment2 },
      ])
      .execute()
  }
}
