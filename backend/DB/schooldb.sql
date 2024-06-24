-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Gegenereerd op: 20 dec 2023 om 17:49
-- Serverversie: 10.4.28-MariaDB
-- PHP-versie: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `schooldb`
--

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `cijfers`
--

CREATE TABLE `cijfers` (
  `id` bigint(20) NOT NULL,
  `student_id` bigint(20) DEFAULT NULL,
  `docent_id` bigint(20) DEFAULT NULL,
  `subject_id` bigint(20) DEFAULT NULL,
  `grade` float DEFAULT NULL,
  `weight` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `cijfers`
--

INSERT INTO `cijfers` (`id`, `student_id`, `docent_id`, `subject_id`, `grade`, `weight`) VALUES
(1, 3, 3, 1, 9, 2),
(2, 3, 3, 2, 6, 1),
(3, 3, 3, 4, 4, 1),
(4, 3, 3, 4, 4.5, 1),
(5, 3, 3, 2, 8.5, 1),
(6, 3, 3, 4, 8, 1),
(7, 3, 3, 4, 8.5, 1),
(8, 3, 3, 4, 5.4, 1),
(9, 3, 3, 4, 5.4, 1),
(10, 3, 3, 4, 5.4, 1),
(11, 3, 3, 4, 5.4, 1),
(12, 3, 3, 4, 5.4, 1),
(13, 3, 3, 4, 9.9, 1),
(14, 3, 3, 4, 9.9, 1),
(15, 3, 3, 4, 9.9, 1),
(16, 3, 3, 1, 8.4, 3),
(17, 3, 3, 1, 4.64, 3),
(18, 10, 3, 2, 9, 1),
(19, 10, 3, 1, 7.5, 2),
(20, 10, 3, 2, 5.4, 3),
(21, 10, 3, 4, 5, 2),
(22, 3, 3, 3, 3.2, 3);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `class`
--

CREATE TABLE `class` (
  `id` bigint(20) NOT NULL,
  `class` varchar(255) DEFAULT NULL,
  `study` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `class`
--

INSERT INTO `class` (`id`, `class`, `study`) VALUES
(1, 'SD3B', 'Software Development'),
(2, 'SD3A', 'Software Development'),
(3, 'SD69', 'Software Engineer');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `docenten`
--

CREATE TABLE `docenten` (
  `id` bigint(20) NOT NULL,
  `user_role` bigint(20) DEFAULT NULL,
  `docent_number` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `docenten`
--

INSERT INTO `docenten` (`id`, `user_role`, `docent_number`) VALUES
(3, 34, 43243242);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) NOT NULL,
  `RoleName` enum('student','teacher','manager') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `roles`
--

INSERT INTO `roles` (`id`, `RoleName`) VALUES
(1, 'student'),
(2, 'teacher'),
(3, 'manager');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `studenten`
--

CREATE TABLE `studenten` (
  `id` bigint(20) NOT NULL,
  `user_role` bigint(20) DEFAULT NULL,
  `student_number` int(11) DEFAULT NULL,
  `class_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `studenten`
--

INSERT INTO `studenten` (`id`, `user_role`, `student_number`, `class_id`) VALUES
(3, 33, 123123, 1),
(4, 35, 456839, 1),
(5, 36, 538363, 1),
(6, 37, 345674, 3),
(7, 38, 876542, 2),
(8, 39, 647647, 2),
(9, 40, 647647, 2),
(10, 41, 647647, 3),
(11, 42, 647647, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `subjects`
--

CREATE TABLE `subjects` (
  `id` bigint(20) NOT NULL,
  `subject` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `subjects`
--

INSERT INTO `subjects` (`id`, `subject`) VALUES
(1, 'Frontend'),
(2, 'Backend'),
(3, 'CSP'),
(4, 'SEO');

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `userrole`
--

CREATE TABLE `userrole` (
  `id` bigint(20) NOT NULL,
  `user_id` bigint(20) DEFAULT NULL,
  `role_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `userrole`
--

INSERT INTO `userrole` (`id`, `user_id`, `role_id`) VALUES
(33, 92, 1),
(34, 93, 2),
(35, 94, 1),
(36, 95, 1),
(37, 96, 1),
(38, 97, 1),
(39, 98, 1),
(40, 99, 1),
(41, 100, 1),
(42, 101, 1);

-- --------------------------------------------------------

--
-- Tabelstructuur voor tabel `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `username` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `DOB` date NOT NULL,
  `address` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Gegevens worden geëxporteerd voor tabel `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `firstname`, `lastname`, `email`, `DOB`, `address`) VALUES
(92, 'Ramon', '$2b$10$pQNoVHWpKcuYOmPbOLeGPOxMEYYrBAoD2BNxMcnRvLtSsFH7PeXb.', 'Ramon', 'Askamp', 'ramonaskamp12@gmail.com', '2005-04-14', 'Kerkweg 36'),
(93, 'Ronald', '$2b$10$z8olprIRc6cC0rL4wel6XuAeymC1obTewFa.z4j8qUSCW3pDuin4m', 'Ronald', 'Kerssies', 'ronaldkerssies@deltion.nl', '1973-06-12', 'phplaan 23'),
(94, 'silas', '$2b$10$L.2GXU./dyTjauLm.5ngtur7SmRBBtzBrSpIuDPp0iMBbjw4hk3nu', 'honda', 'klas', 'sdq67820@omeie.com', '2005-12-04', 'hondenstraat 34'),
(95, 'copiumman', '$2b$10$YJmc666YlSYnX2eU2xZwCu8dXWhpyJ2z8BQlRWPFpa50xlIxVGrt6', 'Bakka', 'Amogus', 'tobysdsfdfsdsf3chedfsfdsese@gmail.com', '2023-12-09', 'hondenstraffsdft 34'),
(96, 'Ronaldsddsfdfs', '$2b$10$VglWoXNgmF.a7/Ronc3/BeFK4zhhkGRkUAkfOX0dalay6sZKbQ/w6', 'hondadfs', 'dfsfdssfd', 'tobdfsdfsadfsay523cheese@gmail.com', '2005-04-04', 'dfsdfsdfs'),
(97, 'ramon32432324432342', '$2b$10$m21pATc6.gZH6lGFM3aK1.5fpn1iqmH1WMTkgksMwFJz8wzgwAcjy', 'dfsdsfdfssdffsd', 'sdfdfsdfsfdsdfs', 's423234234dq67820@omeie.com', '2000-04-04', 'hondensdfdfsfdsstraffsdft 34'),
(98, 'Ronald696969', '$2b$10$/UmzOsbFRixbuRN6vEzLmOlSjxbAEJfIUt19kJxed0FCyzDeTLB4q', 'blackfdssdfsdf', 'dsfdsfdfssfd', 'ramfdsfdson@radfssfdmon.nl', '2000-04-04', 'hondensdfsdffsdsffdstraat 34'),
(99, 'Ronald6969695', '$2b$10$cdEcNKo/KUGnCLA8WkoVE.6PwgEVXv8Xhw/aXV2U9bw3Q1QAmFfX6', 'blackfdssdfsdf', 'dsfdsfdfssfd', 'ramfdsfdson@radfssfdmon.nl', '2000-04-04', 'hondensdfsdffsdsffdstraat 34'),
(100, 'Ronald69696953', '$2b$10$U.5n9LDvmDZMGlKIqDY9xOR6.142XVv3KxZItN8lcDn9dErS76Qlm', 'blackfdssdfsdf', 'dsfdsfdfssfd', 'ramfdsfdson@radfssfdmon.nl', '2000-04-04', 'hondensdfsdffsdsffdstraat 34'),
(101, 'Ronald6969695344', '$2b$10$kwOizqsznzP/K/RvHm/Uk.T.9EgZGuQXRELIXsWuJQnUaaI3KTJZK', 'blackfdssdfsdf', 'dsfdsfdfssfd', 'ramfdsfdson@radfssfdmon.nl', '2000-04-04', 'hondensdfsdffsdsffdstraat 34');

--
-- Indexen voor geëxporteerde tabellen
--

--
-- Indexen voor tabel `cijfers`
--
ALTER TABLE `cijfers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `student_id` (`student_id`),
  ADD KEY `docent_id` (`docent_id`),
  ADD KEY `subject_id` (`subject_id`);

--
-- Indexen voor tabel `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `docenten`
--
ALTER TABLE `docenten`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_role` (`user_role`);

--
-- Indexen voor tabel `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `studenten`
--
ALTER TABLE `studenten`
  ADD PRIMARY KEY (`id`),
  ADD KEY `class_id` (`class_id`),
  ADD KEY `user_role` (`user_role`);

--
-- Indexen voor tabel `subjects`
--
ALTER TABLE `subjects`
  ADD PRIMARY KEY (`id`);

--
-- Indexen voor tabel `userrole`
--
ALTER TABLE `userrole`
  ADD PRIMARY KEY (`id`),
  ADD KEY `role_id` (`role_id`),
  ADD KEY `userrole_ibfk_1` (`user_id`);

--
-- Indexen voor tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--

--
-- AUTO_INCREMENT voor een tabel `cijfers`
--
ALTER TABLE `cijfers`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT voor een tabel `class`
--
ALTER TABLE `class`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `docenten`
--
ALTER TABLE `docenten`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT voor een tabel `studenten`
--
ALTER TABLE `studenten`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT voor een tabel `subjects`
--
ALTER TABLE `subjects`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT voor een tabel `userrole`
--
ALTER TABLE `userrole`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT voor een tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=102;

--
-- Beperkingen voor geëxporteerde tabellen
--

--
-- Beperkingen voor tabel `cijfers`
--
ALTER TABLE `cijfers`
  ADD CONSTRAINT `cijfers_ibfk_1` FOREIGN KEY (`student_id`) REFERENCES `studenten` (`id`),
  ADD CONSTRAINT `cijfers_ibfk_2` FOREIGN KEY (`docent_id`) REFERENCES `docenten` (`id`),
  ADD CONSTRAINT `cijfers_ibfk_3` FOREIGN KEY (`subject_id`) REFERENCES `subjects` (`id`);

--
-- Beperkingen voor tabel `docenten`
--
ALTER TABLE `docenten`
  ADD CONSTRAINT `docenten_ibfk_1` FOREIGN KEY (`user_role`) REFERENCES `userrole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `studenten`
--
ALTER TABLE `studenten`
  ADD CONSTRAINT `studenten_ibfk_2` FOREIGN KEY (`class_id`) REFERENCES `class` (`id`),
  ADD CONSTRAINT `studenten_ibfk_3` FOREIGN KEY (`user_role`) REFERENCES `userrole` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Beperkingen voor tabel `userrole`
--
ALTER TABLE `userrole`
  ADD CONSTRAINT `userrole_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userrole_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
