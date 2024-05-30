---
title: "Soft Actor-Critic"
date: Fri Nov 24 2023 10:38:00
type: reinforcement-learning
---
## Training Loop

1.  Compute Action

-   Random sampling(at first)\
    `action = env.action_space.sample()`
-   Then: `action = agent.get_action(observation)`

2.  Step environment\
    `...=env.step()`

3.  Add data to replay buffer\
    `replay_buffer.insert(...)`

4.  Handle episode termination

5.  Sample from replay buffer\
    `batch = replay_buffer.sample(config["batch_size"])`

6.  Train agent\
    `agent.update(...)`

    Update Critic\
    `self.update_critic(observations, actions, rewards, next_observations, dones)`
    Update Actor\
    `self.update_actor(observations)`\
    Hard Update

        if step % self.target_update_period == 0:
            soft_update_target_critic(1.0)

    Soft Update
    `self.soft_update_target_critic(self.soft_target_update_rate)`

    Update Function:
    `target_param.data.copy_(target_param.data * (1.0 - tau) + param.data * tau)`

\
\

Using a separate target network \$\$Q_φ′\$\$, perform soft updates \$\$
φ′ ← φ′ + τ (φ − φ′) \$\$

## Entropy

Objective function for policy with entropy bonus.

\$\$ H(π(a\|s)) = E\_{a∼π} \[− log π(a\|s)\] \$\$

In code:
`-action_distribution.log_prob(action_distribution.rsample()).mean()`

## Update Critic

1.  Get Actor Distribution
    `next_action_distribution = self.actor(next_obs)`
2.  Sample from actor `next_action = next_action_distribution.sample()`
3.  Get q_values `next_qs = self.q_backup_strategy(next_qs)`

\
\

-   Double-Q \$\$ y_A = r + γQ\_{φ′\_B} (s′, a′) \$\$ \$\$ y_B = r +
    γQ\_{φ′\_A} (s′, a′) \$\$ In code:
    `next_qs = torch.roll(next_qs, shifts=-1, dims=0)`
-   Clipped double-Q: \$\$ y_A = y_B = r + γ \\min(Q\_{φ′\_A} (s′, a′),
    Q\_{φ′\_B} (s′, a′)) \$\$ In code:
    `next_qs = torch.min(next_qs, dim=0)[0]`

\$\$y ← r_t + γ(1 − d_t) \[Q_φ(s\_{t+1} a\_{t+1}) +
βH(π(a\_{t+1}\|s\_{t+1}))\]\$\$

4.  Compute Entropy(if used)\
    `next_action_entropy = self.entropy(next_action_distribution)`

    Then adding temperature\
    `next_qs -= (self.temperature * next_action_entropy)`

5.  Compute the target Q-value\
    `target_values = reward + self.discount * (1- done) * next_qs`

6.  Predict Q-values and Compute Loss

```{=html}
<!-- -->
```
    q_values = self.critic(obs, action)
    loss = self.critic_loss(q_values, target_values)

\
\

## Update Actor

### REINFORCE

Actor with REINFORCE

\$\$ E\_{s∼D,a∼π(a\|s)} \[∇\_θ log(π_θ (a\|s))Q_φ(s, a)\] \$\$

1.  Generate Action distribution\
    `action_distribution: torch.distributions.Distribution = self.actor(obs)`

2.  Sample batch\
    `action = action_distribution.sample([self.num_actor_samples])`

3.  Compute q_values `q_values = self.critic(obs, action)`

4.  Compute loss\
    `loss = -torch.mean(q_values * action_distribution.log_prob(action))`

5.  Compute entropy\
    `torch.mean(self.entropy(action_distribution))`

\
\

### REPARAMETRIZE

Actor with REPARAMETRIZE

\$\$ ∇\_θ E\_{s∼D, a∼π_θ(a\|s)} \[Q(s, a)\] = ∇\_θ E\_{s∼D, ε∼N} \[Q(s,
μ_θ(s) + σ_θ(s)ε)\] = E\_{s∼D, ε∼N} \[∇\_θ Q(s, μ_θ(s) + σ_θ(s)ε)\] \$\$

(Use rsample instead)

### Objective function for policy with entropy bonus.

\$\$ L_π = Q(s, μ_θ (s) + σ_θ (s)ε) + βH(π(a\|s)) \$\$

In code: `loss -= self.temperature * entropy`

## Experiments to Run

    # SAC
    # HalfCheetah
    python cs285/scripts/run_hw3_sac.py -cfg experiments/sac/halfcheetah_reinforce1.yaml
    python cs285/scripts/run_hw3_sac.py -cfg experiments/sac/halfcheetah_reinforce10.yaml
    python cs285/scripts/run_hw3_sac.py -cfg experiments/sac/halfcheetah_reparametrize.yaml


    # Hopper
    python cs285/scripts/run_hw3_sac.py -cfg experiments/sac/hopper.yaml
    python cs285/scripts/run_hw3_sac.py -cfg experiments/sac/hopper_clipq.yaml
    python cs285/scripts/run_hw3_sac.py -cfg experiments/sac/hopper_doubleq.yaml


    # Humanoid
    python cs285/scripts/run_hw3_sac.py -cfg experiments/sac/humanoid.yaml

\
\

## Results

![image](https://blog.jimchen.me/d73b750e-0161-4b70-a9b3-bb5527510992)

![image](https://blog.jimchen.me/4d080b90-7aba-4016-ba33-961c1a7a8c5a)
![image](https://blog.jimchen.me/1207fdce-f26f-4a38-a710-5190667efd07)

The Q_values tend to be more stable with clipq. Singleq overestimates
Q_values. Thus singleq tend todrop in performances.

![image](https://blog.jimchen.me/ca47de8e-9173-4fef-980a-aba928d42861)

## References

- [Soft Actor-Critic: Off-Policy Maximum Entropy Deep Reinforcement Learning with a Stochastic Actor](https://arxiv.org/abs/1801.01290)
- [OpenAI Gym](https://gym.openai.com/)
- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)
- [CS285 at UC Berkeley: Deep Reinforcement Learning](http://rail.eecs.berkeley.edu/deeprlcourse/)
