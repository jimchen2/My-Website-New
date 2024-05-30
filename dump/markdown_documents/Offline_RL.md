---
title: "Offline RL"
date: Wed Nov 29 2023 17:55:09
type: reinforcement-learning
---
## Exploration

### random Agent

![image](https://blog.jimchen.me/74d6d334-aba5-4c69-a8c5-874ca4f320a3)
![image](https://blog.jimchen.me/3d5c55bb-184f-45b9-94ec-dbb91a52a6c7)
![image](https://blog.jimchen.me/a5126abf-eb93-4d09-9aac-5853f974411a)

### rnd Agent

The Random Network Distillation algorithm encourages exploration by
training another neural network to approximate the output of a randomly
initialized target network, using the discrepancy in predictions to
explore new state-action spaces.

\$\$\\phi\^\* = \\arg\\min\_{\\phi} \\mathbb{E}\_{s,a,s\' \\sim D}
\\left\[ \\left\\\| \\hat{f}\_{\\phi}(s\') - f\^\*\_{\\theta}(s\')
\\right\\\| \\right\] \$\$

-   Update rnd network

```{=html}
<!-- -->
```
    target_features = self.rnd_target_net(obs)
    predicted_features = self.rnd_net(obs)
    loss = nn.functional.mse_loss(predicted_features, target_features)

-   Compute rnd bonus for rewards

```{=html}
<!-- -->
```
    rewards = rewards.float() + self.rnd_weight * rnd_error

\
\

![image](https://blog.jimchen.me/acb90732-ac6f-4276-a08a-0c40522acc68)
![image](https://blog.jimchen.me/6e528cdd-9e4e-4797-8f3b-213a8eb37a97)
![image](https://blog.jimchen.me/c0137997-78e4-45d7-890b-55ab03b04629)

## Offline RL

### dqn Agent

![image](https://blog.jimchen.me/47c10922-ac3e-4918-949f-59bd003fe1e3)
![image](https://blog.jimchen.me/30602eee-c91c-4c4d-94de-d967e6a38426)

### cql Agent

Conservative Q-Learning in offline reinforcement learning aims to
prevent policy value overestimation by learning a lower-bound
Q-function, reducing those for unseen state-action pairs.

\$\$ \\text{TD Error} + \\alpha \\times \\frac{1}{N} \\sum\_{i=1}\^{N}
\\left( \\log \\sum\_{a} \\exp \\left( \\frac{Q(s_i, a)}{\\tau}
\\right) - Q(s_i, a_i) \\right) \$\$

    random_actions = torch.randint(self.num_actions, (obs.size(0), 1)).to(ptu.device)  # Generate random actions
    random_qa_values = self.critic(obs).gather(1, random_actions)  # Get Q-values for random actions
    cql_reg = torch.logsumexp(random_qa_values / self.cql_temperature, dim=1).mean()  # Compute CQL regularization term
    loss += self.cql_alpha * (cql_reg - qa_values.mean())  # Update loss with CQL regularizer

\
\

![image](https://blog.jimchen.me/abcae500-a1d3-4d80-8763-aa63a3801f38)
![image](https://blog.jimchen.me/604248a8-52ac-4e1c-8f42-901d4ca3d398)
![image](https://blog.jimchen.me/a302cf4d-a5f4-42f5-8f50-504c4817aa0f)
![image](https://blog.jimchen.me/c4d91368-1ebe-442b-afd1-ec16cc9d0805)

### awac Agent

\$\$\\mathbb{E}\_\\mathcal{D} \\left\[ \\left( Q(s, a) - r(s, a) +
\\gamma \\mathbb{E}\_{a\' \\sim \\pi} \\left\[ Q\_{\\phi\_{k-1}}(s\',
a\') \\right\] \\right)\^2 \\right\] \\tag{7}\$\$

-   Compute critic_loss

```{=html}
<!-- -->
```
    # Compute target values
    with torch.no_grad():
        next_qa_values = self.target_critic(next_observations)
        next_q_values = torch.max(next_qa_values, dim=1)[0]
        target_values = rewards + self.discount * next_q_values * (~ dones)

    # Compute q values based on the action
    qa_values = self.critic(observations)
    q_values = qa_values.gather(1, actions.unsqueeze(-1)).squeeze(-1)
    loss = F.mse_loss(q_values, target_values)

\
\

\$\$ \\theta \\leftarrow \\arg\\max\_\\theta \\mathbb{E}\_{s,a \\sim
\\mathcal{B}} \\left\[ \\log \\pi\_\\theta(a\|s)
\\exp\\left(\\frac{1}{\\lambda} A\^{\\pi_k}(s, a)\\right) \\right\].
\\tag{6} \$\$

-   Update Actor

```{=html}
<!-- -->
```
    logits = self.actor(observations).logits
    log_probs = torch.log_softmax(logits, dim=-1)
    selected_log_probs = log_probs.gather(1, actions.unsqueeze(-1)).squeeze(-1)
    advantages = self.compute_advantage(observations, actions)
    weights = torch.exp(advantages / self.temperature)
    loss = -(weights * selected_log_probs).mean()

\
\

![image](https://blog.jimchen.me/7f646fb0-fef8-468c-9e78-7201c1973b46)

### iql Agent

\$\$L_Q(\\theta) = \\mathbb{E}\_{(s,a,s\') \\sim D} \[(r(s, a) + \\gamma
V\_\\phi(s\') - Q\_\\theta(s, a))\^2\]\$\$

-   Update q values

```{=html}
<!-- -->
```
    with torch.no_grad():
        target_values = rewards + self.discount * self.target_value_critic(next_observations).squeeze(-1) * (~ dones)
    loss = self.critic_loss(q_values, target_values)

\$\$L\_{\\tau}\^2(\\mu) = \|\\tau - \\mathbf{1}\_{\\mu \\leq
0}\|\\mu\^2\$\$

-   Expectile loss

```{=html}
<!-- -->
```
    residuals = target_qs - vs
    loss = torch.where(residuals < 0, (1 - expectile) * residuals ** 2, expectile * residuals ** 2)
    loss = loss.mean()

\
\

\$\$L_V(\\phi) = \\mathbb{E}\_{(s,a) \\sim D}
\[L\_{\\tau}\^2(Q\_\\theta(s, a) - V\_\\phi(s))\]\$\$

-   Update v

```{=html}
<!-- -->
```
    vs = self.value_critic(observations).squeeze(-1)
    loss = self.iql_expectile_loss(self.expectile, vs, q_values)

\
\

<figure>
<img
src="https://github.com/jimchen2/nonimportant/assets/123833550/9f52825d-9d70-4c3b-ad83-5ca2f7fc423f"
alt="image" />
<h2 id="experiements-to-run">Experiements to run</h2>
<pre><code>python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_easy_random.yaml \
--dataset_dir datasets/ --log_interval 1000
python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_medium_random.yaml \
--dataset_dir datasets/ --log_interval 1000
python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_hard_random.yaml \
--dataset_dir datasets/ --log_interval 1000


python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_easy_rnd.yaml \
--dataset_dir datasets/ --log_interval 1000
python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_medium_rnd.yaml \
--dataset_dir datasets/ --log_interval 1000
python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_hard_rnd.yaml \
--dataset_dir datasets/ --log_interval 1000



#4.1

python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_easy_cql.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \

python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql_alpha0.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql_alpha10.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql_alpha1.yaml \
--dataset_dir datasets --log_interval 1000


python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_easy_dqn.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_dqn.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \






#4.2

python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_easy_awac.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_awac.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \


python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_easy_iql.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_iql.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \




#4.3


python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_medium_rnd_1000.yaml \
--dataset_dir datasets/ --log_interval 1000
python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_medium_rnd_5000.yaml \
--dataset_dir datasets/ --log_interval 1000
python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_medium_rnd_10000.yaml \
--dataset_dir datasets/ --log_interval 1000
python cs285/scripts/run_hw5_explore.py \
-cfg experiments/exploration/pointmass_medium_rnd_20000.yaml \
--dataset_dir datasets/ --log_interval 1000

python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql_rnd1000.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql_rnd5000.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql_rnd10000.yaml \
--dataset_dir datasets --log_interval 1000
python ./cs285/scripts/run_hw5_offline.py \
-cfg experiments/offline/pointmass_medium_cql_rnd20000.yaml \
--dataset_dir datasets --log_interval 1000</code></pre>
<p><br />
<br />
</p>
</figure>


## References

- [Conservative Q-Learning for Offline Reinforcement Learning](https://arxiv.org/abs/2006.04779)
- [UC Berkeley CS285: Deep Reinforcement Learning](http://rail.eecs.berkeley.edu/deeprlcourse/)
- [OpenAI Gym](https://gym.openai.com/)
- [PyTorch Documentation](https://pytorch.org/docs/stable/index.html)
