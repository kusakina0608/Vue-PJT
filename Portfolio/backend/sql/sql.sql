-- 스키마 생성
CREATE SCHEMA `vue_pjt_portfolio` ;

-- 관리자 계정 생성
-- email: platina.kusakina@gmail.com
-- password: dev1!
INSERT INTO `vue_pjt_portfolio`.`admins` (`id`, `email`, `password`, `name`, `created_at`, `updated_at`) VALUES ('1', 'platina.kusakina@gmail.com', '$2b$10$pzrTcHe6.ZBv9bltIU42kuQi.OkukvJpA1ci6TLSNazuXdiSYqp6m', '이대진', '2020-09-20 05:24:15', '2020-09-20 05:24:15');


-- 포트폴리오 생성
INSERT INTO `vue_pjt_portfolio`.`portfolios` (`id`, `title`, `content`, `image`, `repository`, `created_at`, `updated_at`) 
VALUES ('1', '이뉴에게 물어봐', '키오스크로 정보를 제공해주는 캠퍼스 가이드 입니다.', 'uploads/AskINU&&1600593456810.gif', 'https://github.com/kusakina0608/AskINU', '2020-09-20 09:08:16', '2020-09-20 09:08:16');

INSERT INTO `vue_pjt_portfolio`.`portfolios` (`id`, `title`, `content`, `image`, `repository`, `created_at`, `updated_at`) 
VALUES ('2', '드림 캐쳐', '학생들에게 진로와 직업에 관련된 정보를 제공해주는 챗봇 드림캐쳐입니다.', 'uploads/DreamCatcher&&1600593468582.png', 'https://github.com/kusakina0608/DreamCatcher', '2020-09-20 09:08:16', '2020-09-20 09:08:16');

INSERT INTO `vue_pjt_portfolio`.`portfolios` (`id`, `title`, `content`, `image`, `repository`, `created_at`, `updated_at`) 
VALUES ('3', 'Xamarin Clock', 'Xamarin과 C#을 사용하여 제작한 TV용 디지털 시계 입니다.', 'uploads/XamarinClock&&1600593482614.gif', 'https://github.com/kusakina0608/Xamarin-Digital-Clock-for-TV', '2020-09-20 09:08:16', '2020-09-20 09:08:16');

INSERT INTO `vue_pjt_portfolio`.`portfolios` (`id`, `title`, `content`, `image`, `repository`, `created_at`, `updated_at`) 
VALUES ('4', 'DirectX 2D 게임', 'DirectX 2D로 제작한 게임입니다.', 'uploads/DirectX2DGame&&1600593492434.png', 'https://github.com/kusakina0608/DirectX2D', '2020-09-20 09:08:16', '2020-09-20 09:08:16');

INSERT INTO `vue_pjt_portfolio`.`portfolios` (`id`, `title`, `content`, `image`, `repository`, `created_at`, `updated_at`) 
VALUES ('5', 'Java Swing 자판기', 'Java Swing을 사용하여 만든 자판기 프로그램 입니다. 상품을 선택한 뒤 금액을 입력하면 거스름돈의 수를 최소로 하여 잔돈을 거슬러 줍니다.', 'uploads/JavaSwingVending&&1600593503976.gif', 'https://github.com/kusakina0608/Vending-Machine-Swing', '2020-09-20 09:08:16', '2020-09-20 09:08:16');

