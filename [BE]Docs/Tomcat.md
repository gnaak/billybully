# [BE] Tomcat 튜닝
* * * 
## 사용자 수의 기준을 어떻게 정할까?
![모두의 마블MAU](https://s3-ap-northeast-2.amazonaws.com/mobiinsidecontent/kr/wp-content/uploads/2018/01/02100514/2017MAUTOP-02.png)

위 사진을 바탕으로 저희 게임과 가장 비슷한 모두의 마블을 기준으로 사용자를 계산해보겠습니다.
```shell
평균 MAU = 2,200,000

DAU = 2,220,000 / 30 (days)
    = 73,400
    
시간당 사용자 수 = 73,400 / 24(hour)
             = 3,058
             
초당 사용자 수 = 3,058 / 3600
           = 0.85
```

모두의 마블은 초당 사용자 수가 0.85명입니다. 해당 계산 결과를 바탕으로 저희가 정한 `Vuser(Thread의 수)`는 800~850으로 정했는데 그 이유는 다음과 같습니다.
#### 1. 피크 타임 부하 시뮬레이션

- **이유**: 서비스가 정상적으로 운영되는 동안 발생할 수 있는 최대 부하 상황을 시뮬레이션하기 위해서입니다. MAU 기반의 평균적인 사용량 계산은 일반적인 상황을 반영하지만, 실제 서비스에서는 특정 시간대에 사용자의 요청이 급증하는 피크 타임이 존재합니다.
- **목적**: 시스템의 한계와 병목 현상을 파악하여, 높은 사용자 수와 요청량을 처리할 수 있는 서비스의 용량을 확보하고자 합니다.

#### 2. 안정성 및 성능 평가

- **이유**: 서비스의 안정성과 성능 한계를 평가하려는 목적입니다. 고부하 시나리오에서도 시스템이 안정적으로 작동하며, 사용자의 요청을 신속하게 처리할 수 있는지 평가하기 위해 진행됩니다.
- **목적**: 시스템이 예상치 못한 사용량 증가를 견딜 수 있는지, 그리고 성능 목표(예: 응답 시간, 처리량 등)를 충족하는지 확인하기 위함입니다.

#### 3. 스케일 업/아웃 계획

- **이유**: 향후 사용자 증가나 비즈니스 확장에 따른 시스템의 스케일 업(리소스 증가) 또는 스케일 아웃(인스턴스 추가) 계획을 수립하기 위해 필요합니다.
- **목적**: 최적의 사용자 경험을 유지하면서 비용 효율적으로 시스템을 확장할 수 있는 전략을 개발하기 위함입니다.

### 결론

800~850명의 가상 사용자로 설정하는 것은 평균 사용량을 기반으로 한 계산보다 훨씬 극단적인 테스트 케이스를 실행함으로써, 실제 운영 환경에서의 예상치 못한 상황에 대비하고, 시스템의 한계를 파악하여 이에 대응하기 위한 충분한 준비를 하기 위함입니다.
* * * 
## 어떤 지표를 사용할까?
저희는 많은 지표중에 TPS를 기반으로 성능을 측정하기로 하였는데 해당 이유는 다음과 같습니다.

| 선정 이유             | 설명 |
|-------------------|---|
| **시스템 용량 계획**     | 시스템이 지원해야 하는 사용자 수와 예상되는 피크 타임의 부하를 기반으로 필요한 최소 TPS 값을 결정할 수 있습니다. 이를 통해 확장성 평가 및 리소스 증설 필요 시점을 예측할 수 있습니다. |
| **성능 목표 설정 및 검증에 적합** | TPS는 구체적이고 측정 가능한 성능 지표로, 성능 목표를 명확하게 설정하고 달성 여부를 객관적으로 판단할 수 있습니다.|
| **시스템 병목 현상 진단에 유용** | TPS 측정을 통해 시스템이나 애플리케이션이 처리할 수 있는 최대 부하와 병목 지점을 파악할 수 있습니다.|

***

### 실험환경
- **테스트 도구** : `jmeter`
- **서버** : `t2.xlarge`
- **VUser** : `800`
- **대상 API** : `사용자 자산 조회 API`
- **Think Time(인지시간)** : `1초`



### Tomcat 튜닝
> 저희의 Tomcat 튜닝 과정은 Max-Thread, MaxConnections, AcceptCount를 적절하게 조절하며 최적의 값을 도출하는 과정으로 이루어졌습니다.

#### Max-Thread 조정
- **Max-Thread 200(Default) -> TPS : 378**
![Thread100](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/Thread200.png?ref_type=heads)
- **Max-Thread 100 -> TPS : 246**
![Thread100](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/Thread100.png?ref_type=heads)
- **Max-Thread 300 -> TPS : 355**
![Thread300](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/Thread300.png?ref_type=heads)
> 기본 세팅값이 더 나은 성능을 보여줌
#### MaxConnections 조정
- **MaxConnections8192(Default) -> TPS : 359**
![MaxConnections8192](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/MaxConnection8192.png?ref_type=heads)
- **MaxConnections7000 -> TPS : 137**
![MaxConnections7000](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/MaxConnection7000.png?ref_type=heads)
- **MaxConnections9500 -> TPS : 369**
![MaxConnections9500](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/MaxConnection9500.png?ref_type=heads)
> 유의미한 차이 없음

#### AcceptCount
- **AcceptCount100(Default) -> TPS : 372**
![AcceptCount100](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/AcceptCount100.png?ref_type=heads)
- **AcceptCount50 -> TPS : 364**
![AcceptCount50](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/AcceptCount50.png?ref_type=heads)
- **AcceptCount300 -> TPS : 368**
![AcceptCount300](https://lab.ssafy.com/s10-fintech-finance-sub2/S10P22A401/-/raw/feat-292/%5BBE%5DDocs/img/AcceptCount300.png?ref_type=heads)
> 유의미한 차이 없음

## 결론
저희는 Max-Thread, MaxConnections, AcceptCount별로 값을 변경시키면서 TPS를 측정한 결과 유의미한 상관관계를 찾지 못했습니다. 따라서 톰캣튜닝을 하지 않기로 결정했습니다.
