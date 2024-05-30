---
title: "Imitation Learning with DAgger"
date: Sat Nov 18 2023 22:36:09
type: reinforcement-learning
---
## Code Implementation Overview

Step the Env

    ac = ptu.to_numpy(policy(ptu.from_numpy(ob.reshape(1, -1))).sample())
    ac = ac[0]  # Retrieve the action value
    next_ob, rew, done, _ = env.step(ac)  

\
\

Collecting Trajectories

    paths, envsteps_this_batch = utils.sample_trajectories(env, actor, params['batch_size'], params['ep_len'])

\
\

Get Expert Policy

    # Update actions in each path using expert policy
    for path in paths:
        path["action"] = expert_policy.get_action(path["observation"])

\
\

Get Sampled Data

    rand_indices = np.random.permutation(replay_buffer.obs.shape[0])[:params['batch_size']]
    ob_batch, ac_batch = replay_buffer.obs[rand_indices], replay_buffer.acs[rand_indices]

\
\

Training the Actor

    train_log = actor.update(ob_batch, ac_batch)

\
\

## Behavioral Cloning

### Ant

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/Ant.pkl --env_name Ant-v4 --exp_name bc_ant --n_iter 1 --expert_data cs285/expert_data/expert_data_Ant-v4.pkl --video_log_freq -1

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/Ant.pkl --env_name Ant-v4 --exp_name bc_ant --n_iter 1 --expert_data cs285/expert_data/expert_data_Ant-v4.pkl --video_log_freq -1 --batch_size 1000 --eval_batch_size 30000  --ep_len 1000 --n_layers 2 --size 32 --learning_rate 3e-2

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/Ant.pkl --env_name Ant-v4 --exp_name bc_ant --n_iter 1 --expert_data cs285/expert_data/expert_data_Ant-v4.pkl --video_log_freq -1 --batch_size 100 --eval_batch_size 30000  --ep_len 1000 --n_layers 2 --size 16 --learning_rate 4e-2

\
\

### HalfCheetah

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/HalfCheetah.pkl --env_name HalfCheetah-v4 --exp_name bc_halfcheetah --n_iter 1 --expert_data cs285/expert_data/expert_data_HalfCheetah-v4.pkl --video_log_freq -1  

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/HalfCheetah.pkl --env_name HalfCheetah-v4 --exp_name bc_halfcheetah --n_iter 1 --expert_data cs285/expert_data/expert_data_HalfCheetah-v4.pkl --video_log_freq -1 --batch_size 100 --eval_batch_size 30000  --ep_len 1000 --n_layers 3 --size 64 --learning_rate 2e-2

\
\

  ----------------------------------------------------------------------------------------------------------
  Environment   Configuration                                                    Mean         Standard
                                                                                              Deviation
  ------------- ---------------------------------------------------------------- ------------ --------------
  Ant           Naive Configuration                                              3,401.8508   0

  Ant           `--size 32 --learning_rate 3e-2`                                 4,585.5176   108.1566

  Ant           `--batch_size 100 --size 16 --learning_rate 4e-2`                4,170.0972   829.4213

  HalfCheetah   Naive Configuration                                              3,264.8667   0

  HalfCheetah   `--batch_size 100 --n_layers 3 --size 64 --learning_rate 2e-2`   3,765.103    106.6637
  ----------------------------------------------------------------------------------------------------------

## Dagger

Add`--do_dagger` to the end of each commands above and change iters

### Ant

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/Ant.pkl --env_name Ant-v4 --exp_name dagger_ant --n_iter 10 --do_dagger --expert_data cs285/expert_data/expert_data_Ant-v4.pkl --video_log_freq -1

\
\

![](https://blog.jimchen.me/b152941e-b730-41cc-a1c9-898813d92388)

### HalfCheetah

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/HalfCheetah.pkl --env_name HalfCheetah-v4 --exp_name bc_halfcheetah --n_iter 10 --expert_data cs285/expert_data/expert_data_HalfCheetah-v4.pkl --video_log_freq -1 --do_dagger

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/HalfCheetah.pkl --env_name HalfCheetah-v4 --exp_name bc_halfcheetah --n_iter 5 --expert_data cs285/expert_data/expert_data_HalfCheetah-v4.pkl --video_log_freq -1 --batch_size 100 --eval_batch_size 10000  --ep_len 1000 --n_layers 3 --size 64 --learning_rate 1e-2 --do_dagger

    python cs285/scripts/run_hw1.py --expert_policy_file cs285/policies/experts/HalfCheetah.pkl --env_name HalfCheetah-v4 --exp_name bc_halfcheetah --n_iter 10 --expert_data cs285/expert_data/expert_data_HalfCheetah-v4.pkl --video_log_freq -1 --batch_size 10000 --eval_batch_size 10000  --ep_len 1000 --n_layers 2 --size 64 --learning_rate 4e-3 --do_dagger

\
\

![](https://blog.jimchen.me/581de3c1-45da-47a9-9ca1-02027142b02a)


## References

- [CS285 at UC Berkeley: Deep Reinforcement Learning](http://rail.eecs.berkeley.edu/deeprlcourse/)
- [OpenAI Gym Documentation](https://www.gymlibrary.dev/)
